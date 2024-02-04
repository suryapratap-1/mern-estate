import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import bcrypt from "bcrypt";

export const signupController = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ $or: [{username}, {email}] })
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "User with username or email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(200).json({
            success: true,
            message: "Successfully created user"
        })
        // return res.status(200).json(
        //     new ApiResponse(200, "Successfully created user")
        // )
    } 
    catch (error) {
        // errorHandler(500, "Internal error occur while sign up")
        // throw new ApiError(500, "Internal error occur while sign up")
        res.status(500).json({
            success: false,
            message: "Internal error occur while sign up"
        })
    }
}