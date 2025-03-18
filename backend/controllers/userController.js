import { User } from "../models/userModel.js";
import brcypt from "bcryptjs";
export const register = async(req,res)=>{
try{
    const {fullname,username,password,confirmpassword,gender} = req.body;
    if(!fullname || !username || !password || !confirmpassword || !gender){
        return res.status(400).json({message:"please fill all the fields"});
    }
    if(password !== confirmpassword){
        return res.status(400).json({message:"password and confirm password should be same"});
    }
    const user = User.findOne({username});
    if(user){
        return res.status(400).json({message:"user Already exists"});
    }
    //hashedPassword
    const hashedPassword = await brcypt.hash(password,10);
//ProfilePhoto..
    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    await User.create({
        fullname,
        username,
        password:hashedPassword,
        profilephoto:gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
        gender

    })
    return res.status(201).json({message:"Account created successfully",success:true});

}catch(err){
 console.log(err);
}
}