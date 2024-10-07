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
        //  Database name
        const database = client.db('tusharlearn');
        //  Collection(students)
        const students = database.collection('students');
        //! -----Create documents() using the insertOne --- 
        // const result = await students.insertOne({
        //     name:'Tushar',
        //     age:22,
        //     subjects:['English','Hindi','Math']
        // })
        //! -----Create documents() using the insertMany
        // const result = await students.insertMany([
        //     {
        //     name:'Tushar',
        //     age:22,
        //     grade:"A",
        //     pass:false,
        //     subjects:['English','Hindi']
        //     },
        //     {
        //     name:'Nikhil',
        //     age:23,
        //     grade:"B",
        //     pass:false,
        //     subjects:['Chemistry','Biology']
        //     },
        //     {
        //     name:'Rahul',
        //     age:23,
        //     grade:"B",
        //     pass:false,
        //     subjects:['Physics','Sst']
        //     }
        // ])
        //!-------Read operation using find
        // const resultCursor = students.find();
        // const result = await resultCursor.toArray() 
        //!-------Read operation using findOne
        // const result = await students.findOne({
        //     name:'Tushar',
        // })
        //!----- Update operation using updateOne() 
        // const result = await students.updateOne(
        //     {
        //     name:'Nikhil' //Filtering
        //     },
        //     {
        //         $set:{age:30,name:"Nikhil 2"}
        //     }
        // );
        //!----- Update operation using updateMany() 
        // const result = await students.updateMany(
        //     {
        //     grade:'B' //Filtering
        //     },
        //     {
        //         $set:{pass:true}
        //     }
        // );
        // !---findOneAndUpdate
        // const result = await students.findOneAndUpdate(
        //     {
        //     name:'Tushar' //Filtering
        //     },
        //     {
        //         $set:{name:"Tushar Yadav"}
        //     }
        // );
        //! -- Delete document using deleteOne() 
        // const result = await students.deleteOne({
        //     name:'Tushar Yadav'
        // })
        //! -- Delete document using deleteMany() 
        // const result = await students.deleteMany({
        //     grade:'B'
        // })
        //! -- Delete document using findOneAndDelete() 
        const result = await students.findOneAndDelete({
            name:'Rahul'
        })
    } catch (error) {
        console.log(error); 
    }
}

connectDB();
app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));