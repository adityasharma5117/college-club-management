const express = require("express")
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { User} = require("../models/user")

router.post("/",async (req,res)=>{
    try {
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(400).json("User not signed up");
        }

        const isPasswordMatch = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordMatch){
            return res.status(403).json({messsage : "Invalid or incorrect password"});
        }

        const token = jwt.sign({email,password},"secret",{expiresIn : "24h"});

        return res.status(200).json({message : "User logged in successfully",user : existingUser,token : token})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router