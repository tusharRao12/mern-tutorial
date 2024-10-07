const express = require('express');
const path = require('path')
const app = express();
const PORT = 8082;

//! For serve static files
app.use(express.static(path.join(__dirname,'public'))) 

// !Set the view engine as ejs
app.set('view engine','ejs');

// Render home page
app.get('/',(req,res)=>{
    res.render('home')
});

// Render about page
app.get('/about',(req,res)=>{
    res.render('about')
});

// Render contact page
app.get('/contact',(req,res)=>{
    res.render('contact')
});

// Render gallery page
app.get('/gallery',(req,res)=>{
    res.render('gallery')
});



app.listen(PORT, console.log(`Server is ruuning on ${PORT}`))