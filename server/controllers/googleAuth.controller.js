import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function generatePassword(num) {
    return Math.random().toString(36).slice(-num)
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