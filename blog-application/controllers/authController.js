const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.getLogin = (req,res)=>{
    res.render('login',{title:'Login', error: null })
};


exports.login = async (req, res,next) => {
    passport.authenticate(
        "local",(err,user,info)=>{
            if(err){
                return next(err)
            }
            if(!user){
                return res.render('login',{
                    title:"Login",
                    user:req.username,
                    error:info.message,
                })
            }
            req.logIn(user,(err)=>{
                if(err){
                    return next(err);
                }
                return res.redirect('/');
            })
        }
    )(req,res,next)
};

exports.getRegister = (req,res)=>{
    res.render('register',{ title: 'Register', error: null })
};

exports.register = async(req,res)=>{
    const {username,email,password} = req.body;
    try{
        const existingUserName = await User.findOne({username});
        const existingUserEmail = await User.findOne({email});

        if(existingUserName){
            return res.render('register',{
                title:'Register',
                user:req.username,
                error:"Username already taken",
            })
        }else if(existingUserEmail){
            return res.render('register',{
                title:'Register',
                user:req.username,
                error:"Email already exists",
            })
        }else{
            const hashedPassword = await bcrypt.hash(password,10)
            const user = await User.create({
                username,
                email,
                password:hashedPassword,
            });
            res.redirect('/auth/login');
        }
    }catch(error){
       res.render("register",{
        title:"Register",
        user:req.username,
        error:error.message,
       })
    }
};