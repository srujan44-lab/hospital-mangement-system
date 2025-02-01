import { Router } from "express";
import {
  addAppointment,
  deleteAppointmentById,
  getAllAppointments,
  getAllAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  getAppointmentsByScheduleId,
} from "../controller/appointment.controller";

const route = Router();

route.post("/", addAppointment);
route.get("/", getAllAppointments);
route.get("/:id", getAllAppointmentsByDoctorId);
route.get("/schedule/:scheduleId", getAppointmentsByScheduleId);
route.get("/patient/:patientId", getAppointmentsByPatientId);
route.delete("/:id", deleteAppointmentById);

export default route;
