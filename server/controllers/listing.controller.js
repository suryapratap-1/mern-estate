import { Listing } from "../models/listing.model.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js"

// create listing
export const createListing = async (req, res) => {
    // console.log(req.user)
    // console.log(req.files)

    const { 
        listingName, description, localAddress, price, bedrooms, bathrooms, kitchens, furnishType, carpetArea, type, parking,
        country, state, pincode
    } = req.body

    // console.log(listingName, description, address, price, bedrooms, bathrooms, kitchens, furnishType, type, parking)

    if (
        !listingName || !description || !localAddress || !price || !bedrooms || !bathrooms || !kitchens || 
        !furnishType || !carpetArea || !type || !parking || !country || !state || !pincode ) {
        return res.status(401).json({
            success: false,
            data: {
                listingName, description, localAddress, price, bedrooms, bathrooms, kitchens, 
                furnishType, carpetArea, type, parking, country, state, pincode
            },
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

// show listing by id
export const listingByID = async (req, res) => {
    const { listingID } = req.params;
    
    try {
        const data = await Listing.findById(listingID);
        if (!data) {
            return res.status(401).json({ 
                success: false,
                message: 'Listing ID is incorrect'
            })
        }

        return res.status(200).json({
            success: true,
            listing: data,
            message: 'Successfully fetched listing'
        })
    } 
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to get the listing",
            error: error.message,
        })
    }
}

// show all listings
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

// search listing 
export const searchListing = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let furnished = req.query.furnishType;
        if ( furnished === undefined || furnished === "both" ) {
            furnished = { $in: ['Furnished', 'Semi furnished'] }
        }

        let type = req.query.type;
        if ( type === undefined || type === "all" ) {
            type = { $in: ['Rent', 'Sale'] }
        }

        let parking = req.query.parking;
        if ( parking === undefined ) {
            parking = { $in: [true, false] }
        }

        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';

        const listings = await Listing.find({
            localAddress: { $regex: searchTerm, $options: 'i' },
            furnishType: furnished,
            type: type,
            parking: parking,
        })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);

        if (!listings) {
            return res.status(200).json({
                success: false,
                message: "No listings found.",
                data: listings
            });
        }

        return res.status(200).json({
            success: true,
            message: "Successfully searched listings.",
            data: listings
        });

        // const furnishedType = req.query.furnishType || '';
        // const typeOfProperty = req.query.type || '';
        // const location = req.query.address || req.body.address || '';

        // const listings = await Listing.aggregate([
        //     {
        //         $search: {
        //             index: "text",
        //             text: {
        //                 query: location,
        //                 path: {
        //                     wildcard: "*"
        //                 }
        //             }
        //         }
        //     },
        //     {
        //         $match: {
        //             $or: [
        //                 { furnishType: furnishedType },
        //                 { type: typeOfProperty },
        //             ]
        //         }
        //     },
        // ]);

        // return res.status(200).json({
        //     success: true,
        //     message: "Successfully searched listings.",
        //     data: listings
        // });

    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Unable to search listing, please try again.",
            error: error.message,
        })
    }
}