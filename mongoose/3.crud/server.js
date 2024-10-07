const express = require('express');
const mongoose = require('mongoose');
const PORT = 5000 || process.env.PORT

const app =express();
const URL ="mongodb://localhost:27017/tushar-db" ;
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

//!=====================CRUD OPERATIONS==============================
//? ======================Create doc================================= 
//!.save()

// const newUser = new User({
//     username:'Tushar',
//     age:22,
//     birthday:new Date('2002-03-13'),
//     isActive:true,
//     hobbies:['Cricket','Gaming'],
//     address:{
//        street: 'ward no 12',
//        city:'Farruknagar',
//        postCode:122506
//     },
//     customData:{
//         country:"India"
//     }
// })
// newUser.save().then((data)=>{
//     console.log(data);
// }).catch((e)=>console.log(e))

//!.create() 

// User.create({
//     username:'Nikhil',
//     age:22,
//     birthday:new Date('2002-03-13'),
//     isActive:true,
//     hobbies:['Cricket','Gaming'],
//     address:{
//        street: 'ward no 12',
//        city:'Farruknagar',
//        postCode:122506
//     },
//     customData:{
//         country:"India"
//     }
// }).then((data)=>{
//     console.log(data);
// }).catch((e) => console.log(e));


//!.insertMany() 

// User.insertMany([{
//     username:'Rahul',
//     age:22,
//     birthday:new Date('2002-03-13'),
//     isActive:true,
//     hobbies:['Cricket','Gaming'],
//     address:{
//        street: 'ward no 12',
//        city:'Farruknagar',
//        postCode:122506
//     },
//     customData:{
//         country:"India"
//     }
// },
// {
//     username:'Dr',
//     age:22,
//     birthday:new Date('2002-03-13'),
//     isActive:true,
//     hobbies:['Cricket','Gaming'],
//     address:{
//        street: 'ward no 12',
//        city:'Farruknagar',
//        postCode:122506
//     },
//     customData:{
//         country:"India"
//     }
// },
// {
//     username:'Gourav',
//     age:22,
//     birthday:new Date('2002-03-13'),
//     isActive:true,
//     hobbies:['Cricket','Gaming'],
//     address:{
//        street: 'ward no 12',
//        city:'Farruknagar',
//        postCode:122506
//     },
//     customData:{
//         country:"India"
//     }
// }]).then((data)=>{
//     console.log(data);
// }).catch((e) => console.log(e));

//! ======================Read doc================================= 

//!------find()-----------
// User.find().then((User)=>{
//     console.log(User);
// }).catch(e=>console.log(e));

//!------findOne()-----------
// User.findOne({ age: 22 })
//   .then((user) => {
//     console.log(user); 
//   })
//   .catch((e) => console.log(e));

//!------findById()-----------

// User.findById('670388669ccd987bfab5a789')
//   .then((user) => {
//     console.log(user); 
//   })
//   .catch((e) => console.log(e));


//!-----.where()-----------------
// const findUsers = async ()=>{
//     try{
//         const users =await User.find().where('age').gte(27)
//         console.log(users);
//     }catch(error){
//         console.log(error)
//     }
// }
// findUsers();

//!-----.sort()-----------------

// const findUsers = async ()=>{
//     try{
//         const users =await User.find().sort({username:1})
//         console.log(users);
//     }catch(error){
//         console.log(error)
//     }
// }
// findUsers();
//!-----.limit()-----------------

// const findUsers = async ()=>{
//     try{
//         const users =await User.find().sort({username:1}).limit(2);
//         console.log(users);
//     }catch(error){
//         console.log(error)
//     }
// }
// findUsers();

//!=================================Updated documents====
//!--------------.updateOne()----------------------  
// const updateDoc = async () =>{
//     try{
//         await User.updateOne(
//             {
//                 username:'Tushar'
//             },
//             {
//                 isActive:false
//             },
//             {
//                 new:true
//             }
//         )
//     }catch(error){
//         console.log(error);
//     }
// }
// updateDoc();

//!--------------.findByIdAndUpdate()---------------------- 
// const updateDoc = async () =>{
//     try{
//         await User.findByIdAndUpdate(
//             '6703877f9bab8e12789870ab',
//             {
//                 age:23,
//                 username:'Tushar Rao'
//             },
//             {
//                 new:true
//             }
//         )
//     }catch(error){
//         console.log(error);
//     }
// }
// updateDoc(); 
//!--------------.findOneAndUpdate()----------------------  
// const updateDoc = async () =>{
//     try{
//         await User.findOneAndUpdate(
//             {
//                 _id:'670388669ccd987bfab5a789'
//             },
//             {
//                 age:23,
//                 username:'Nikhil Rao'
//             },
//             {
//                 new:true
//             }
//         )
//     }catch(error){
//         console.log(error);
//     }
// }
// updateDoc(); 
//!--------------Update Operators----------------------  
// !$set $unset
// const updateDoc = async () =>{
//     try{
//         await User.findOneAndUpdate(
//             {
//                 _id:'670388669ccd987bfab5a789'
//             },
//             {
//                 $set:{age:24},
//                 $unset:{username:1}
//             },
//             {
//                 new:true
//             }
//         )
//     }catch(error){
//         console.log(error);
//     }
// }
// updateDoc();
// !$addToSet $push
// const updateDoc = async () =>{
//     try{
//         await User.findOneAndUpdate(
//             {
//                 _id:'670388669ccd987bfab5a789'
//             },
//             {
//                 // $addToSet:{hobbies:'Crying'}
//                 $push:{hobbies:'Noob'}
//             },
//             {
//                 new:true
//             }
//         )
//     }catch(error){
//         console.log(error);
//     }
// }
// updateDoc();

// !$inc $mul
// const updateDoc = async () =>{
//     try{
//         await User.findOneAndUpdate(
//             {
//                 _id:'670388669ccd987bfab5a789'
//             },
//             {
//                 // $inc:{age:1}
//                 $mul : {age:10},
//             },
//             {
//                 new:true
//             }
//         )
//     }catch(error){
//         console.log(error);
//     }
// }
// updateDoc();

// !======================Delet Operators================
const deleteDoc = async()=>{
    try{
        // !findById and delt
        // await User.findByIdAndDelete("670388669ccd987bfab5a789")
        // !findone and delete
        // await User.findOneAndDelete({username:'Dr'})
        // !deletmany
        await User.deleteMany({age:{$gt:21}});
    }catch(error){
        console.log(error);
    }
}
deleteDoc()

app.get('/',(req,res)=>{
    res.send("Hello wolr")
})

app.listen(PORT,console.log(`Server starts at ${PORT}`))