const mongoose = require("mongoose");

const connectDB = async ()=>{
    await mongoose.connect("mongodb+srv://aditya:aditya@cluster0.ter5kq0.mongodb.net/club?retryWrites=true&w=majority",{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected to Database!")
    }).catch((err)=>{
        console.log(err)
    });
}    

module.exports = {connectDB};