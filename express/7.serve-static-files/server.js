const express = require('express');
const path = require('path')
const app = express();
const PORT = 8082;

//! For serve static files
app.use(express.static(path.join(__dirname,'public'))) 

// Render home page
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','home.html'))
});

// Render about page
app.get('/about',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','about.html'))
});

// Render contact page
app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','contact.html'))
});

// Render gallery page
app.get('/gallery',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','gallery.html'))
});


app.listen(PORT, console.log(`Server is ruuning on ${PORT}`))