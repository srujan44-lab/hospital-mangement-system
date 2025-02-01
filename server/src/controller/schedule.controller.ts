import { RequestHandler } from "express";
import db from "../config/db";

const getAllSchedules: RequestHandler = async (req, res) => {
  const query: string = `
    SELECT 
      s.scheduleid, 
      s.docid, 
      s.title, 
      s.scheduledate, 
      s.scheduletime, 
      s.nop, 
      d.name, 
      d.specialties, 
      d.email, 
      d.mobileNumber, 
      COALESCE(a.appointment_count, 0) AS appointment_count
    FROM schedule s
    JOIN doctor d ON s.docid = d.email
    LEFT JOIN (
        SELECT scheduleid, COUNT(*) AS appointment_count
        FROM appointment
        GROUP BY scheduleid
    ) a ON s.scheduleid = a.scheduleid
    WHERE 
      s.scheduledate > CURDATE() AND 
      COALESCE(a.appointment_count, 0) < s.nop;
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

export const getAllSchedulesByDoctorId: RequestHandler = async (req, res) => {
  const id = req.params.id;

  const query: string = `
    SELECT 
      s.scheduleid, 
      s.docid, 
      s.title, 
      s.scheduledate, 
      s.scheduletime, 
      s.nop, 
      d.name, 
      d.specialties, 
      d.email, 
      d.mobileNumber, 
      COALESCE(a.appointment_count, 0) AS appointment_count
    FROM schedule s
    JOIN doctor d ON s.docid = d.email
    LEFT JOIN (
        SELECT scheduleid, COUNT(*) AS appointment_count
        FROM appointment
        GROUP BY scheduleid
    ) a ON s.scheduleid = a.scheduleid
    WHERE 
      s.scheduledate > CURDATE() AND 
      COALESCE(a.appointment_count, 0) < s.nop AND 
      s.docid = '${id}';
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

const addSchedule: RequestHandler = (req, res) => {
  const { title, docid, nop, scheduleDate, scheduleTime } = req.body;

  const query = `
    INSERT INTO schedule VALUE (
      NULL, '${docid}', '${title}', '${scheduleDate}', '${scheduleTime}', ${nop}
    )`;

  db.query(query, async (error, result) => {
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

const deleteScheduleById: RequestHandler = async (req, res) => {
  const id = req.params.id;

  const query = `
    DELETE FROM schedule
    WHERE scheduleid = '${id}'
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

export { getAllSchedules, addSchedule, deleteScheduleById };
