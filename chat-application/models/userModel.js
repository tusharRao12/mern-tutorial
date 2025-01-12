const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    dateOfBirth: {
        type: Date,
        required: true, 
    },
    image:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    is_online:{
        type:String,
        default:'0',
    },
},
{timestamps:true}
);

module.exports = mongoose.model('User',userSchema)
