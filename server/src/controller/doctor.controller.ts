import { RequestHandler } from "express";
import db from "../config/db";

const getAllDoctors: RequestHandler = async (req, res) => {
  const query: string = `
    SELECT *
    FROM doctor
  `;

  db.query(query, (error, result) => {
    if (error) {
      res.status(500).send("internal server error");
      console.log(error);
      return;
    }

    res.status(200).json(result);
  });
};

const updateDoctorByEmail: RequestHandler = async (req, res) => {
  const email = req.params.email;
  const { name, mobileNumber, specialties } = req.body;

  const query = `
    UPDATE doctor
    SET name = '${name}', mobileNumber = '${mobileNumber}', specialties = '${specialties}'
    WHERE email = '${email}'
  `;

  db.query(query, (error, result) => {
    if (error) {
      res.status(500).send("internal server error");
      console.log(error);
      return;
    }

    res.status(200).json(result);
  });
};

const deleteDoctorByEmail: RequestHandler = async (req, res) => {
  const email = req.params.email;

  const query = `
    DELETE FROM doctor
    WHERE email = '${email}'
  `;

  db.query(query, (error, result) => {
    if (error) {
      res.status(500).send("internal server error");
      console.log(error);
      return;
    }

    res.status(200).json(result);
  });
};

const addDoctor: RequestHandler = async (req, res) => {
  const { name, email, password, mobileNumber, specialties } = req.body;

  const query = `
    INSERT INTO doctor VALUE (
      '${email}', '${name}', ${password}, '${mobileNumber}', '${specialties}'
    )`;

  db.query(query, (error, result) => {
    if (error) {
      if (error.sqlMessage?.startsWith("Duplicate entry")) {
        res.status(409).send("You have already added this doctor");
        return;
      }

      res.status(500).send("internal server error");
      console.log(error);
      return;
    }

    res.status(200).json(result);
  });
};

export { getAllDoctors, updateDoctorByEmail, deleteDoctorByEmail, addDoctor };
