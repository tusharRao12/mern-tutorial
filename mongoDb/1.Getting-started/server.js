const express = require('express');
const app = express();
const PORT = 5000;
const {MongoClient,ServerApiVersion} = require('mongodb');

//! connect to mongodb
// user:raotushar1122
// password:3GDCF7K3f0vPS5js
// connection string :mongodb+srv://raotushar1122:3GDCF7K3f0vPS5js@tusharyadav.od4m6.mongodb.net/?retryWrites=true&w=majority&appName=tusharyadav

// 1. Create a client
const client = new MongoClient('mongodb+srv://raotushar1122:3GDCF7K3f0vPS5js@tusharyadav.od4m6.mongodb.net/?retryWrites=true&w=majority&appName=tusharyadav',{serverApi:{
    version:ServerApiVersion.v1,
    strict:true,
    deprecationErrors:true,
}});

// 2 Function to connect
const connectDB = async ()=>{
    try {
        await client.connect();
        console.log("MongDb connected succesfullt")
    } catch (error) {
        console.log(error); 
    }
}

connectDB();
app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));