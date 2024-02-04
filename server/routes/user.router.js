import { Router } from "express";
import { signupController } from "../controllers/signup.controller.js";
import { loginController } from "../controllers/login.controller.js";
// import { signupMiddleware } from "../middlewires/signup.middleware.js";
export const userRouter = Router();

userRouter.route("/sign-up").post( signupController )
userRouter.route("/login").post(loginController)