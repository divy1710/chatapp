import express from 'express';
import dotenv from "dotenv";
import connectDB from "./config/database.js"
import userRoute from "./routes/userRoute.js";
const app = express();
dotenv.config({});
const PORT = process.env.PORT || 8080;

//middleware..
app.use(express.json());
//routes
app.use("/api/v1/user",userRoute);

app.get("/",(req,res)=>{
    res.send("<h1>Hello World </h1>")
})


app.listen(PORT,()=>{
    connectDB();
    console.log(`server is running on prot : ${PORT}`);
})