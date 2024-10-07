const express = require('express');

const userRouter = express.Router()

//! Using the route()


// getting all user
userRouter.route('/').get((req,res)=>{
    res.json({
        message:'All users fetched',
    })
});
module.exports = userRouter;

// handle a specific user
userRouter.route('/:id').get((req,res)=>{
    res.json({
        message:'Single user fetched'
    });
}).put((req,res)=>{
    res.json({
        message:'user updated'
    });
}).delete((req,res)=>{
    res.json({
        message:'User deleted'
    });
});