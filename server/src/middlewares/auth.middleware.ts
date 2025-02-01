import { RequestHandler } from "express";
import { JwtPayload, Secret, verify } from "jsonwebtoken";
import db from "../config/db";
import { adminType, doctorType, patientType } from "../types/user.type";

const authUser: RequestHandler = async (req, res, next) => {
  const token: string | undefined =
    req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send("User not authorized");
    return;
  }

  const decoded: string | JwtPayload = verify(
    token,
    process.env.SECRETE_KEY as Secret
  );

  // query to retrive the user with Sid = id
  const email = (decoded as any).email;

  const query: string = email.endsWith("@admin.com")
    ? `
  SELECT *
  FROM admin
  WHERE email = '${email}'
`
    : email.endsWith("@doctor.com")
    ? `
  SELECT *
  FROM doctor
  WHERE email = '${email}'
`
    : `
  SELECT *
  FROM patient
  WHERE email = '${email}'
`;

  // retriving the user with Sid = id from db
  db.query(query, (error, result) => {
    if (error) {
      res.status(500).send("internal server error");
      console.log(error);
      return;
    }

    const user: patientType & doctorType & adminType = result[0];

    if (!user) {
      res.status(401).send("unauthorized user");
      return;
    }

    const { password, ...authuser } = user;

    (req as any).user = authuser;
    next();
  });
};

export { authUser };
