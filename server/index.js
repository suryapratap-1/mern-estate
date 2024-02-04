import dotenv from "dotenv";
import { connectDB } from "./database/database.js";
import { app } from "./app.js"
import { userRouter } from "./routes/user.router.js";

dotenv.config()

connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️  Server started at http://localhost:${process.env.PORT}`)
    })
    app.on("error", (error) => {
        console.log("Error: ", error)
        throw error
    })

    app.use("/api/v1/user", userRouter)
})
.catch((error) => {
    console.log("MongoDB connection failed ", error);
})