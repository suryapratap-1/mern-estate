import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer","");

        if (!token) {
            return res.status(401).json({ success: false, message: "Token is not available"})
        }

        try {
            const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decode;
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                data: error,
                message: error || "Something went wrong"
            })
        }

        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            data: error,
            message: "Token is invalid"
        })
    }
}