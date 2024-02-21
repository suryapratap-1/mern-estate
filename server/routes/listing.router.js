import { Router } from "express";
import { createListing } from "../controllers/createListing.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


export const listingRouter = Router();


listingRouter.route("/create").post(verifyToken, upload.array("images", 6), createListing);