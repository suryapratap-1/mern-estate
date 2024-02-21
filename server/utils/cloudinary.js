import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadToCloudinary = async (localFilePath, folder) => {
    try {
        if (!localFilePath) return null;
        const options = {folder};
        options.resource_type = "auto";
        const response = await cloudinary.uploader.upload(localFilePath, options);
        // if (response) {
        //     fs.unlinkS(localFilePath)
        // }
        return response.url;
    } 
    catch (error) {
        console.log(error)
        fs.unlinkSync(localFilePath);
        console.log('Unable to upload to cloudinary');
    }
};