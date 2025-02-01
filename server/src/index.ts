import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import db from "./config/db";

import authRouter from "./routes/auth.routes"
import doctorRouter from "./routes/doctor.routes"
import scheduleRouter from "./routes/schedule.routes"
import patientRouter from "./routes/patient.routes"
import appointmentRouter from "./routes/appointment.routes"

const app = express();
dotenv.config()

// checking whether database is connected or not
db.connect((error) => {
  if (error) console.error("Fail to connect the Database\n", error);
  else console.log("database connected successfully");
})

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: 'GET, POST, PUT, DELETE',
  credentials: true
}))

app.use("/auth", authRouter)
app.use("/doctor", doctorRouter)
app.use("/schedule", scheduleRouter)
app.use("/patient", patientRouter)
app.use("/appointment", appointmentRouter)


const PORT: string = process.env.PORT || "4000";

// listening the server in the metioned PORT
app.listen(PORT, () =>
  console.log("Server started running at the PORT:", PORT)
);