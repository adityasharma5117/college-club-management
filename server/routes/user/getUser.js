const express = require("express")
const router = express.Router();

const {User} = require("../../models/user")

router.get("/:email",async (req,res)=>{
    const email = req.params.email;

    const existingUser = await User.findOne({email});
    if(!existingUser){
        return res.status(404).json({messsage : "User not found"})
    }

    return res.status(200).json({user : existingUser});
})

module.exports = router;