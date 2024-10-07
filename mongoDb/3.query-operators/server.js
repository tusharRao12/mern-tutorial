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
        const employees = database.collection('employees')
        // const employeesDoc = [
        //     {name:'Tushar',age:21,department:'Tech'},
        //     {name:'Rahul',age:22,department:'Hr'},
        //     {name:'Dr',age:23,department:'Manager'},
        //     {name:'Nikhil',age:22,department:'Testing'},
        //     {name:'Gamer',age:28,department:'Gamer'},
        // ];
        // const result = await employees.insertMany(employeesDoc);
        // console.log(result)

        //! Querying operators ============ 
        //!---$gt - greater than
        // const employeesCursor = employees.find({age:{$gt:25}})
        // const result = await employeesCursor.toArray();
        // console.log(result)
        //!---$gte - greater than or equal to
        // const employeesCursor = employees.find({age:{$gte:25}})
        // const result = await employeesCursor.toArray();
        // console.log(result)
        //!---$ne -   not equal to
        // const employeesCursor = employees.find({age:{$ne:25}})
        // const result = await employeesCursor.toArray();
        // console.log(result)
        //!---$le -   less than 
        // const employeesCursor = employees.find({age:{$lt:22}})
        // const result = await employeesCursor.toArray();
        // console.log(result)
        //!---$lte -   less than equal to
        // const employeesCursor = employees.find({age:{$lte:22}})
        // const result = await employeesCursor.toArray();
        // console.log(result)
        //!---$nin -   not inclusive
        // const employeesCursor = employees.find({age:{$nin:[22,23]}})
        // const result = await employeesCursor.toArray();
        // console.log(result)
        //!---$multiple condtion
        const employeesCursor = employees.find({age:{$gt:23,$lte:45}})
        const result = await employeesCursor.toArray();
        console.log(result)
    } catch (error) {
        console.log(error); 
    }
}

connectDB();
app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));