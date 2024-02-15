import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

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