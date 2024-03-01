import { Listing } from "../models/listing.model.js";

export const showListing = async (req, res) => {
    try {
        const allPost = await Listing.find();
        // console.log(allPost)
        if (!allPost) {
            return res.status(400).json({
                success: false,
                message: 'No listings found'
            })
        }

        return res.status(200).json({
            success: true,
            listings: allPost,
            message: "All listings are fetched successfully."
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error,
            message: 'Unable to show listings'
        })
    }
}