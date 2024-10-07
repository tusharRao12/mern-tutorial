const express = require('express');
const app = express();
const PORT = 5000;
const {MongoClient,ServerApiVersion} = require('mongodb');

//! connect to mongodb

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
        console.log("MongDb connected succesfull")
        const database = client.db('tusharlearn')
        // Collection
        const books = database.collection('books')
        // const booksDoc = [
        //     {name:'Environment', pages:200, author:'Tushar'},
        //     {name:'Pollution', pages:20, author:'Nikhil'},
        //     {name:'Social Media', pages:100, author:'Rahul'},
        // ];
        // const result = await books.insertMany(booksDoc);
        // console.log(result)
        //!  Logical Operators
        // !--------Or---
        const booksCursor = books.find({$or:[{name:'Environment'},{pages:{$lt:20}}]})
        const result = await booksCursor.toArray();
        console.log(result);
        
    } catch (error) {
        console.log(error); 
    }
}

connectDB();
app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));