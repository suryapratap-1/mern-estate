import { Listing } from "../models/listing.model.js";

export const createListing = async (req, res) => {

    const body = req.body;
    const { listingName, description, address, price, bedrooms, bathrooms, kitchens, furnishType, images } = req.body;

    if (!listingName || !description || !address || !price || !bedrooms || !bathrooms || !kitchens || !furnishType || !images ) {
        return res.status(401).json({
            success: false,
            message: "All fields are required."
        })
    };

    try {
        const listing = await Listing.create( {...body, owner: req.user.id} )
        console.log(listing)

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
        return res.status(500).json({
            success: false,
            message: "Unable to create listing at this moment. Please try again later."
        })
    }
}