const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {type : String},
    email : {type : String},
    regNumber : {type : String},
    password : {type : String},
    clubPreference : {type : String}
})

const User = mongoose.model("user",userSchema);

module.exports = {User};