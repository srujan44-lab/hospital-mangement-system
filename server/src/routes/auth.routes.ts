import { Router } from "express";
import {
  getAuthUser,
  loginHandler,
  logoutHandler,
  signupHandler,
} from "../controller/auth.controller";
import { authUser } from "../middlewares/auth.middleware";

const route = Router();

route.post("/signup", signupHandler);
route.post("/login", loginHandler);
route.get("/logout", logoutHandler);
route.get("/user", authUser, getAuthUser);

export default route;
