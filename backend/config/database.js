import mongoose from "mongoose"
const connectDB = async ()=>{
    await mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("MongoDB connected")
    }).catch(()=>{
        console.log("Error connecting to MongoDB")
    })
}

export default connectDB;