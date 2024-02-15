import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

        if ( bcrypt.compare(password, validUser.password) ) {
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
            res.cookie("access_token", token, { httpOnly: true }).status(200).json({
                    success: true,
                    data: rest,
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