import { Router } from "express";
import { getAllPatients, getAllPatientsByDocId } from "../controller/patient.controller";

const route = Router();

route.get("/", getAllPatients);
route.get("/:id", getAllPatientsByDocId);

export default route;
