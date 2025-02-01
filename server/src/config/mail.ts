import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSKEY,
  },
});