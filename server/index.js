const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

const {connectDB} = require("./config/database")

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));

connectDB();

app.get("/",(req,res)=>{
    res.send("Working");
})

app.use("/signup",require("./routes/signup"));
app.use("/login",require("./routes/login"));
app.use("/user",require("./routes/user/getUser"));
app.use("/user",require("./routes/user/editUser"));
app.listen(PORT,()=>{
    console.log(`Server running at port: ${PORT}`);
})
