const express = require("express")
const router = express.Router();
const {User} = require("../../models/user")

router.put("/edit",async (req,res)=>{
    try {
        const {clubPreference,email} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            res.status(404).json({message : "User not found"})
            return;
        }

        const newUser = await User.findOneAndUpdate(
            {email},
            {$set : {
                clubPreference : clubPreference
            },
        },           
        {new : true},
            )

        res.status(200).json(newUser);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;