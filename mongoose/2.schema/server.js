const express = require('express');
const mongoose = require('mongoose');
const PORT = 5000 || process.env.PORT

const app =express();
const URL ="mongodb://localhost:27017/" ;
const connectTODB = async()=>{
    try{
        await mongoose.connect(URL);
        console.log("Mongo db connect")
    }catch(error){
        console.log(error)
    }
}
connectTODB();

//! Design schema 

const userProfileSchema = new mongoose.Schema({
    username:String,
    age:Number,
    birthday:Date,
    isActive:Boolean,
    hobbies:[String],
    objectId:mongoose.Schema.Types.ObjectId,
    address:{
        street:String,
        city:String,
        postCode:Number,
    },
    customData:mongoose.Schema.Types.Mixed,
})

//! COmpile the schema to form the model
const User = mongoose.model('User',userProfileSchema); 

app.get('/',(req,res)=>{
    res.send("Hello wolr")
})

app.listen(PORT,console.log(`Server starts at ${PORT}`))