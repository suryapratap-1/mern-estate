import { Router } from "express";
import { createListing } from "../controllers/createListing.controller.js";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";


export const listingRouter = Router();


listingRouter.route("/create").post(verifyToken, createListing);