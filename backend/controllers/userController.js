import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { fullname, username, password, confirmpassword, gender } = req.body;

        // console.log(fullname, username, password, confirmpassword, gender);

        if (!fullname || !username || !password || !confirmpassword || !gender) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({ message: "Password and confirm password should be same" });
        }

        // **Fix: Await the findOne() call**
        const user = await User.findOne({ username });
        
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Profile Photo
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullname,
            username,
            password: hashedPassword,
            profilephoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
            gender
        });

        return res.status(201).json({ message: "Account created successfully", success: true });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
    }
};
