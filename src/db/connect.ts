import mongoose from "mongoose";

async function connectToDB() {
    try {
        await mongoose.connect(String(process.env.MONGO_URI))
        console.log("Successfully Connected to Mongo")
    } catch (error) {
        console.error("Error connecting to mongo db", error)
    }
}

export default connectToDB