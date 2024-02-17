import { Router } from "express";
import { signupController } from "../controllers/userAuth.controller.js";
import { loginController } from "../controllers/userAuth.controller.js";
import { googleAuthController } from "../controllers/userAuth.controller.js";
import { updateUserInfoController } from "../controllers/userAuth.controller.js"
import { verifyToken } from "../middlewares/verifyToken.middleware.js"
import { deleteUser } from "../controllers/userAuth.controller.js";
import { signOutController } from "../controllers/userAuth.controller.js";

import { verifyUser } from "../middlewares/verifyUser.middleware.js";

export const userRouter = Router();

userRouter.route("/sign-up").post( signupController )
userRouter.route("/login").post(loginController)
userRouter.route("/google").post(googleAuthController)
userRouter.route("/update/:id").post(verifyToken, updateUserInfoController)
userRouter.route("/delete/:id").delete(verifyUser, deleteUser)
userRouter.route("/signout").get(signOutController)