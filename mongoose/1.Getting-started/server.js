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

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.listen(PORT,console.log(`Server starts at ${PORT}`))