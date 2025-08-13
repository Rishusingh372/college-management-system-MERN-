const express = require("express")
const app = express();
const mongoose = require("mongoose")


app.listen("3004",()=>{
  console.log("Server is running on port 3004");
})

// mongoose connection
const Mongo_URL = "mongodb://localhost:27017/CMS-DB";
async function main(){
  await mongoose.connect(Mongo_URL)
}
main().then(()=>{
  console.log("MongoDB connected successfully");
})
.catch((err)=>{
  console.error("MongoDB connection error:", err);
})

// path 
app.get("/" , (req,res)=>{
  res.send("Welcome to the CMS Backend");
} )