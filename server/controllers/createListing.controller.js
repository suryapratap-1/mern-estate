import { Listing } from "../models/listing.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";

export const createListing = async (req, res) => {

    const { listingName, description, address, price, bedrooms, bathrooms, kitchens, furnishType } = req.body

    if (!listingName || !description || !address || !price || !bedrooms || !bathrooms || !kitchens || !furnishType ) {
        return res.status(401).json({
            success: false,
            message: "All fields are required."
        })
    }

    try {
        // for single file upload
        // const imagesFromRequest = req.file[0]?.path;
        // await uploadToCloudinary(imagesFromRequest)

        if (!req.files) return res.status(401).json({ 
            success: false,
            message: "File is not received"
        })
        
        const listingImagesArray = [];

        for (let i = 0; i < req.files.length; i++) {
            const localFilePath = req.files[i]?.path
            let result = await uploadToCloudinary(localFilePath, "mern-estate")
            listingImagesArray.push(result)
        }

        const listing = await Listing.create({
            ...req.body,
            images: listingImagesArray,
            owner: req.user.id
        })

        if (!listing) {
            return res.status(401).json({
                success: false,
                message: "Unable to create listing, please try again."
            })
        }

        return res.status(200).json({
            success: true,
            data: listing,
            message: "Listing created."
        })
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error,
            message: "Unable to create listing at this moment. Please try again later."
        })
    }
}
