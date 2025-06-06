import dotenv from "dotenv";
import { connectDB } from "./database/database.js";
import { app } from "./app.js"
import { userRouter } from "./routes/user.routes.js";
import { listingRouter } from "./routes/listing.routes.js";

dotenv.config();

connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️  Server started at http://localhost:${process.env.PORT}`)
    })

    app.get("/api/v1", (req, res) => {
        res.status(200).json({
            success: true,
            message: "Welcome to the API"
        });
    });

    app.on("error", (error) => {
        console.log("Error: ", error)
        throw error
    })

    app.use("/api/v1/auth", userRouter);
    app.use("/api/v1/listings", listingRouter);
})
.catch((error) => {
    console.log("MongoDB connection failed ", error);
})