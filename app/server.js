const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();

const app=express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://mongodb:27017/mydb")
.then(()=>console.log("mongoose connected successfully"))
.catch((err)=>console.log(err));
app.use("/api/auth",require("./routes/auth.js"));
app.listen(9000,()=>
{
console.log("the server is running on port 9000");
})


