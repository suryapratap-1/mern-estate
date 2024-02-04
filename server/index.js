import dotenv from "dotenv";
import { connectDB } from "./database/database.js";
import { app } from "./app.js"

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
})
.catch((error) => {
    console.log("MongoDB connection failed ", error);
})