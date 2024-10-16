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

//!

const userProfileSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username is required'],
        validate:{
          validator:function(value){
            return /^[a-zA-Z0-9]+$/.test(value)
          },
           message:'Username can only contain alphnmeric'
        },
        unique:true,
        minLenght:3,
        maxLenght:10
    },
    email:{
        type:String,
        required:[true,'Email is required'],
        validate:{
            validator:function(value){
              return value.endsWith('@gmail.com')
            },
             message:'Mail invalid'
          },
        unique:true,
        match:/@/,
    },
    age:{
        type:Number,
        required:[true,'Age is required'],
        min:18,
        max:65,
    },
    gender:{
        type:String,
        enum:['Male','Female','Other'],
        defualt:'Other'
    },
})

//! 
const User = mongoose.model('User',userProfileSchema); 

const createDoc = async () =>{
    try{
        const userCreated = await User.create({
            gender: 'Male',
            username: 'Tushar',
            age:22,
            email:'tushar@gmailcom'
        });
        console.log(userCreated);
    }catch(err){
        console.log(err);
    }
}
createDoc();

app.get('/',(req,res)=>{
    res.send("Hello wolr")
})

app.listen(PORT,console.log(`Server starts at ${PORT}`))