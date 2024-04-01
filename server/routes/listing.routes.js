import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createListing, showListing, listingByID, searchListing } from "../controllers/listing.controller.js";

export const listingRouter = Router();


listingRouter.route("/create").post(verifyToken, upload.array("images", 6), createListing);
listingRouter.route("/search").get(searchListing);
listingRouter.route("/show-all").get(showListing);
listingRouter.route("/:listingID").get(listingByID);