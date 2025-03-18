import mongoose from "mongoose";

const messageModel  = new mongoose.Schema({
    senderID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    receiverID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    message:{
        type:String,
        required:true
        }
},{timestamps:true});

export const Message = mongoose.model("Message",messageModel);