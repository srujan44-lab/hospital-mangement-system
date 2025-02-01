import { Router } from "express";
import {
  addDoctor,
  deleteDoctorByEmail,
  getAllDoctors,
  updateDoctorByEmail,
} from "../controller/doctor.controller";

const route = Router();

route.get("/", getAllDoctors);
route.post("/", addDoctor);
route.put("/:email", updateDoctorByEmail);
route.delete("/:email", deleteDoctorByEmail);

export default route;
