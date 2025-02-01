import { doctorType } from "./../types/user.type";
import { RequestHandler } from "express";
import db from "../config/db";
import type { adminType, patientType } from "../types/user.type";
import { Secret, sign } from "jsonwebtoken";

const signupHandler: RequestHandler = async (req, res) => {
  const { name, email, mobileNumber, password } = req.body;

  const query: string = `
    SELECT *
    FROM patient
    WHERE email = '${email}'
  `;

  db.query(query, (error, result) => {
    if (error) {
      res.status(500).send("internal server error");
      console.log(error);
      return;
    }

    const patient: patientType = result[0];

    if (patient) {
      res.status(401).send("patient with this email already exist");
      return;
    }

    const query = `
      INSERT INTO patient VALUE (
        '${email}', '${name}', '${password}', '${mobileNumber}'
      )`;

    db.query(query, (error, result) => {
      if (error) {
        res.status(500).send("internal server error");
        console.log(error);
        return;
      }

      res.status(200).json({ id: result.insertId });
    });
  });
};

const loginHandler: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  const query: string = email.endsWith("@admin.com")
    ? `
    SELECT password
    FROM admin
    WHERE email = '${email}'
  `
    : email.endsWith("@doctor.com")
    ? `
    SELECT password
    FROM doctor
    WHERE email = '${email}'
  `
    : `
    SELECT password
    FROM patient
    WHERE email = '${email}'
  `;

  db.query(query, (error, result) => {
    if (error) {
      res.status(500).send("internal server error");
      console.log(error);
      return;
    }    

    const user: patientType & doctorType & adminType = result[0];

    if (!user) {
      res.status(404).send("user with this email id not found");
      return;
    }

    if (user.password !== password) {
      res.status(401).send("Incorrent password");
      return;
    }

    const token: string = sign({ email }, process.env.SECRETE_KEY as Secret, {
      expiresIn: "1d",
    });

    const userType = email.endsWith("@admin.com")
      ? "admin"
      : email.endsWith("@doctor.com")
      ? "doctor"
      : "patient";

    res
      .cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
      })
      .status(200)
      .json({ message: "user Login successfully", userType });
  });
};

const getAuthUser: RequestHandler = (req, res) => {
  const user = (req as any).user;

  res.status(200).json(user);
};

const logoutHandler: RequestHandler = (req, res) => {
  res.clearCookie('token')
  .status(200)
  .send({message: 'user logged out successfully'})
}

export { signupHandler, loginHandler, getAuthUser, logoutHandler };
