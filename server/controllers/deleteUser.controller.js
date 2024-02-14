import { User } from "../models/user.model.js";

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