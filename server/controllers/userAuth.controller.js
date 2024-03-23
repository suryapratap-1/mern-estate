import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generatePassword } from "../utils/generatePassword.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";


export const signupController = async (req, res) => {
    try {
        const { username, email, password, contactNumber } = req.body;

        if ( !username || !email || !password || !contactNumber ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            })
        }
        
        const existingUser = await User.findOne({ $or: [{username}, {email}] })
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with username or email already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword, contactNumber });
        const userData = await User.findById(newUser._id, "-password");

        res.status(200).json({
            success: true,
            data: userData,
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

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        
        if (!email) {
            return res.status(401).json({ success: false, message: "Email is required" }) 
        }
        if (!password) {
            return res.status(401).json({ success: false, message: "Password is required" }) 
        }

        const validUser = await User.findOne({email})
        if (!validUser) {
            return res.status(409).json({ success: false, message: "User does not exits" })
        }

        const validPassword = await bcrypt.compare(password, validUser.password)
        
        if ( validPassword ) {
            let token = jwt.sign(
                {
                    email: validUser.email,
                    id: validUser._id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                }
            )
            const { password: pass, ...rest } = validUser._doc
            res.cookie("access_token", token, { httpOnly: true, secure: true }).status(200).json({
                    success: true,
                    data: rest,
                    token: token,
                    message: "User logged in successfully."
                }
            )
        }
        else {
            return res.status(401).json({ success: false, message: "Password is incorrect" })
        }
    } 
    catch (error) {
        console.log("Unable to login ", error)
        res.status(500).json({
            success: false,
            message: "Unable to login due to internal error"
        })
    }
}

export const signOutController = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            success: true,
            message: "User logged out successfully."
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "user could not logout at this moment, please try again."
        })
    }
}

export const updateUserInfoController = async (req, res) => {
    if ( req.user.id !== req.params.id ) {
        return res.status(401).json({
            success: false,
            message: "You can only your own account",
        })
    }

    try {
        if ( req.body.password ) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            }, { new: true }
        )
        
        const { password: pass, ...rest } = updatedUser._doc;
        if (updatedUser) {
            return res.status(200).json({
                success: true,
                data: rest,
                message: "User updated successfully."
            })
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not delete user due to internal issue. Please again after sometime."
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            message: "User profile deleted successfully."
        })
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Could not delete user, please again later."
        })
    }
}

export const googleAuthController = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
            const { password: pass, ...rest } = user._doc;
            return res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
        }

        else {
            const newPassword = generatePassword(8);
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const username = req.body.name.split(" ").join("").toLowerCase() + generatePassword(4);

            const newUser = await User.create({ 
                username,
                email: req.body.email,
                password: hashedPassword, 
                avatar: req.body.photo 
            })

            console.log(newUser)

            const token = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
            const { password: pass, ...rest } = newUser._doc;
            return res.cookie("token", token, { httpOnly: true }).status(200).json(rest);
        }
    } 
    catch (error) {
        console.log("Failed to sign in, please try after sometime. ", error)
    }
}