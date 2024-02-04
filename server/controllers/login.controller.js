import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        const validUser = await User.findOne({email})
        if (!validUser) {
            return res.status(409).json({
                success: false,
                message: "User does not exits"
            })
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
            res.cookie("token", token, { httpOnly: true }).status(200).json(rest)
        }

    } 
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Unable to login due to internal error"
        })
    }
}