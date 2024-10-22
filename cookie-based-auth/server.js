const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

//!Middlewarres 
app.use(express.urlencoded({extended:true}));

//!Set view engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(cookieParser()); 

//!Simulated database of users
const users = [
    {username:'Tushar',password:'123',role:'admin'},
    {username:'Nikhil',password:'456',role:'user'}
]

//!ROute

app.get('/',(req,res)=>{
    res.render('home');
})
app.get('/login',(req,res)=>{
    res.render('login');
})
app.post('/login',(req,res)=>{
    // !FInd the user login details
    const userFound = users.find((user)=>{
        const {username, password} = req.body;
        return user.username === username && user.password === password
    });
    // ! Create some cookies (cookie);
    // Preparte the logini user data
    //? setting the cookie wih user data 

    res.cookie('userData',JSON.stringify(userFound),{
        maxAge : 3 * 24 * 60 *1000, //3 days
        httpOnly: true,
        secure:false,
        sameSite:'strict'
    })


    // ! Render the user dashboard
    if(userFound){
        res.redirect('/dashboard');
    }
    // ! Redeirect to login page
})
app.get('/dashboard',(req,res)=>{
    // ! Grab the user from the cookie
    const userData = req.cookies;
    // ! Render the template
    res.render('dashboard');
    // ! Redirect to login
})

app.post('/logout',(req,res)=>{
    
})


app.listen(3000,console.log('Server is running on http://localhost:3000'))