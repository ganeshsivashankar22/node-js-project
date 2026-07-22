const express=require("express");
const mongoose=require("mongoose");
require("dotenv").config();

const app=express();
app.use(express.json());  
mongoose.connect("mongodb://127.0.0.1:27017/mydb")
.then(()=>console.log("mongoose connected successfully"))
.catch((err)=>console.log(err));
app.use("/api/auth",require("./routes/auth.js"));
app.listen(6000,()=>
{
console.log("the server is running on port 6000");
})


