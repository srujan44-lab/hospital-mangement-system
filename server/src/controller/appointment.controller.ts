import { RequestHandler } from "express";
import db from "../config/db";
import { transporter } from "../config/mail";

export const getAppointmentsByScheduleId: RequestHandler = async (req, res) => {
  const scheduleId = req.params.scheduleId;

  const query: string = `
    SELECT *
    FROM appointment
    WHERE scheduleid = ${scheduleId}
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

export const getAppointmentsByPatientId: RequestHandler = async (req, res) => {
  const patientId = req.params.patientId;

  const query: string = `
    SELECT *
    FROM appointment a, patient p, schedule s
    WHERE pid = '${patientId}' AND p.email = a.pid AND s.scheduleid = a.scheduleid
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

export const addAppointment: RequestHandler = async (req, res) => {
  const { pname, pid, apponum, scheduleid, appodate } = req.body;

  const query = `
    INSERT INTO appointment VALUE (
      NULL, '${pid}', ${apponum}, ${scheduleid}, '${appodate.split("T")[0]}'
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

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: pid,
      subject: "Thank you for booking an appointment",
      html: `
              <html>
                  <head>
                      <style>
                          body {
                              font-family: Arial, sans-serif;
                              line-height: 1.6;
                          }
                          .container {
                              max-width: 600px;
                              margin: auto;
                              padding: 20px;
                              border: 1px solid #ddd;
                              border-radius: 8px;
                              background-color: #f9f9f9;
                          }
                          .header {
                              text-align: center;
                              background-color: #007bff;
                              color: #fff;
                              padding: 10px 0;
                              border-radius: 8px 8px 0 0;
                          }
                          .content {
                              padding: 20px;
                              text-align: left;
                          }
                          .footer {
                              text-align: center;
                              font-size: 0.9em;
                              color: #666;
                              margin-top: 20px;
                          }
                      </style>
                  </head>
                  <body>
                      <div class='container'>
                          <div class='header'>
                              <h2>Appointment Confirmation</h2>
                          </div>
                          <div class='content'>
                              <p>Dear <strong>${pname}</strong>,</p>
                              <p>Thank you for booking your appointment with us!</p>
                              <p>Here are your appointment details:</p>
                              <ul>
                                  <li><strong>Appointment Number:</strong> ${apponum}</li>
                                  <li><strong>Appointment Date:</strong> ${appodate.split("T")[0]}</li>
                              </ul>
                              <p>Looking forward to seeing you soon!</p>
                              <p>Best Regards,</p>
                              <p><strong>The Clinic Team</strong></p>
                          </div>
                          <div class='footer'>
                              <p>© 2024 The Clinic. All rights reserved.</p>
                          </div>
                      </div>
                  </body>
              </html>
            `,
    });

    res.status(200).json(result);
  });
};

export const deleteAppointmentById: RequestHandler = async (req, res) => {
  const id = req.params.id;

  const query = `
    SELECT *
    FROM appointment a, patient p
    WHERE appoid = '${id}' AND a.pid = p.email
  `;

  db.query(query, async (error, result) => {
    if (error) {
      res.status(500).send("internal server error");
      console.log(error);
      return;
    }    

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: result[0].pid,
      subject: "Appointment Cancellation Notification",
      html: `<html>
              <head>
                  <style>
                      body {
                          font-family: Arial, sans-serif;
                          line-height: 1.6;
                      }
                      .container {
                          max-width: 600px;
                          margin: auto;
                          padding: 20px;
                          border: 1px solid #ddd;
                          border-radius: 8px;
                          background-color: #f9f9f9;
                      }
                      .header {
                          text-align: center;
                          background-color: #ff4d4d;
                          color: #fff;
                          padding: 10px 0;
                          border-radius: 8px 8px 0 0;
                      }
                      .content {
                          padding: 20px;
                          text-align: left;
                      }
                      .footer {
                          text-align: center;
                          font-size: 0.9em;
                          color: #666;
                          margin-top: 20px;
                      }
                  </style>
              </head>
              <body>
                  <div class='container'>
                      <div class='header'>
                          <h2>Appointment Cancellation Notification</h2>
                      </div>
                      <div class='content'>
                          <p>Dear <strong>${result[0].name}</strong>,</p>
                          <p>We regret to inform you that your appointment has been cancelled. Please find the details below:</p>
                          <ul>
                              <li><strong>Appointment Number:</strong> ${result[0].apponum}</li>
                              <li><strong>Appointment Date:</strong> ${result[0].appodate}</li>
                          </ul>
                          <p>If you have any questions or wish to reschedule, please contact us at support@example.com or +123 456 7890.</p>
                          <p>We apologize for any inconvenience caused.</p>
                          <p>Best Regards,</p>
                          <p><strong>The Clinic Team</strong></p>
                      </div>
                      <div class='footer'>
                          <p>© 2024 The Clinic. All rights reserved.</p>
                      </div>
                  </div>
              </body>
          </html>
      `,
    });

    const query = `
      DELETE FROM appointment
      WHERE appoid = '${id}'
    `;

    db.query(query, async (error, result) => {
      if (error) {
        res.status(500).send("internal server error");
        console.log(error);
        return;
      }

      res.status(200).json(result);
    });
  });
};

export const getAllAppointmentsByDoctorId: RequestHandler = async (
  req,
  res
) => {
  const id = req.params.id;

  const query: string = `
    SELECT 
      p.name AS pname, 
      p.email AS pemail, 
      p.mobileNumber AS pmobile, 
      p.password AS ppassword,
      a.*,
      s.*, 
      d.name AS dname, 
      d.email AS demail, 
      d.mobileNumber AS dmobile, 
      d.password AS dpassword,
      d.specialties AS dspecialties
    FROM appointment a
    JOIN patient p ON p.email = a.pid
    JOIN schedule s ON s.scheduleid = a.scheduleid
    JOIN doctor d ON s.docid = d.email
    WHERE d.email = '${id}';
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

export const getAllAppointments: RequestHandler = async (req, res) => {
  const query: string = `
    SELECT 
      p.name AS pname, 
      p.email AS pemail, 
      p.mobileNumber AS pmobile, 
      p.password AS ppassword,
      a.*,
      s.*, 
      d.name AS dname, 
      d.email AS demail, 
      d.mobileNumber AS dmobile, 
      d.password AS dpassword,
      d.specialties AS dspecialties
    FROM appointment a
    JOIN patient p ON p.email = a.pid
    JOIN schedule s ON s.scheduleid = a.scheduleid
    JOIN doctor d ON s.docid = d.email;
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
