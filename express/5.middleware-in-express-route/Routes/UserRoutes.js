const express = require('express');

const userRoutes = express.Router()

userRoutes.get('/',(req,res)=>{
    res.json({
        message:'all users'
    })
})
userRoutes.get('/:id',(req,res)=>{
    res.json({
        message:'Single user'
    })
})
userRoutes.put('/:id',(req,res)=>{
    res.json({
        message:'Update user'
    })
})
userRoutes.delete('/:id',(req,res)=>{
    res.json({
        message:'user deleted suces'
    })
})

module.exports = userRoutes;