import mongoose from "mongoose";

let connected = false

const connectDB = async () => {
    mongoose.set("strictQuery", true)

    if (connected) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI)

        connected = true

        console.log("MongoDB Connected")
    } catch (error) {
        console.error("MongoDB Connection error:", error)
        throw error
    }
}

export default connectDB
