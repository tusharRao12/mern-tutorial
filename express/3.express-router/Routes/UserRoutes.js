const express = require('express');

const userRoute = express.Router()

userRoute.get('/',(req,res)=>{
    res.send("all users")
})

module.exports = userRoute;