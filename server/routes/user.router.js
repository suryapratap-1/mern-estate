import { Router } from "express";
import { signupController } from "../controllers/signup.controller.js";
import { loginController } from "../controllers/login.controller.js";
import { googleAuthController } from "../controllers/googleAuth.controller.js";
import { updateUserInfoController } from "../controllers/update.controller.js"
import { verifyToken } from "../middlewares/verifyToken.middleware.js"
import { deleteUser } from "../controllers/deleteUser.controller.js";
import { signOutController } from "../controllers/signout.controller.js";

import { verifyUser } from "../middlewares/verifyUser.middleware.js";

export const userRouter = Router();

userRouter.route("/sign-up").post( signupController )
userRouter.route("/login").post(loginController)
userRouter.route("/google").post(googleAuthController)
userRouter.route("/update/:id").post(verifyToken, updateUserInfoController)
userRouter.route("/delete/:id").delete(verifyUser, deleteUser)
userRouter.route("/signout").get(signOutController)