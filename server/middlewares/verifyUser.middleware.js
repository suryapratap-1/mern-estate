import { User } from "../models/user.model.js";

export const verifyUser = async (req, res, next) => {

    const verifiedUser = await User.findById(req.params.id)
    if (!verifiedUser) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized action. Please try with you own account"
        })
    }


    next();
}