const User = require('../models/userModel');
const bcrypt = require('bcrypt');

loginLoad = async(req,res)=>{
    
    try{
        res.render('login',{ title: 'Login' });
    }catch(error){
        console.log(error.message);
    }
}

registerLoad = async(req,res)=>{
    
    try{
        res.render('register',{ title: 'Register' });
    }catch(error){
        console.log(error.message);
    }
}
const register = async(req,res)=>{
    try{
        const passwordHash = await bcrypt.hash(req.body.password,10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            image: 'images/'+ req.file.filename,
            password: passwordHash
        });

        await user.save();

        res.render('register',{ title: 'Register' ,message:'Registration Complete'})
    }catch(error){
        console.log(error.message);
    }
}

module.exports = {
    registerLoad,
    register,
    loginLoad
}