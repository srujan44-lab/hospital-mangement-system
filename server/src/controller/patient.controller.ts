import { RequestHandler } from "express";
import db from "../config/db";

export const getAllPatients: RequestHandler = async (req, res) => {
  const query: string = `
    SELECT *
    FROM patient
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

export const getAllPatientsByDocId: RequestHandler = async (req, res) => {
  const id = req.params.id;

  const query: string = `
    SELECT p.*
    FROM patient p, appointment a, schedule s
    WHERE a.pid = p.email AND a.scheduleid = s.scheduleid AND s.docid = '${id}'
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