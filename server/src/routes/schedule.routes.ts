import { Router } from "express";
import {
  addSchedule,
  deleteScheduleById,
  getAllSchedules,
  getAllSchedulesByDoctorId,
} from "../controller/schedule.controller";

const route = Router();

route.get("/", getAllSchedules);
route.get("/:id", getAllSchedulesByDoctorId);
route.post("/", addSchedule);
route.delete("/:id", deleteScheduleById);

export default route;
