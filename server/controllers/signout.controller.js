
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