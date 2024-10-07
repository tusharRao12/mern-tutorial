const express = require('express');
const path = require('path')
const ejsLayout = require('express-ejs-layouts');
const app = express();
const PORT = 8082;

//! For serve static files
app.use(express.static(path.join(__dirname,'public'))) 

// !Set the view engine as ejs
app.set('view engine','ejs');

//! Plugin the ejs layout as a middleware
app.use(ejsLayout);
app.set('layout','layout/main-layout')

// Render home page
app.get('/', (req, res) => {
    res.render('home', { title: 'Home - Express App' });
});

// Render about page
app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us - Express App' });
});

// Render contact page
app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact - Express App' });
});

// Render gallery page
app.get('/gallery', (req, res) => {
    res.render('gallery', { title: 'Gallery - Express App' });
});

// Not found/404 error handler

app.use((req,res,next)=>{
    const error = new Error("Page not Found")
    next(error);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', { 
        title: 'Error', 
        error: err.message 
    });
});




app.listen(PORT, console.log(`Server is ruuning on ${PORT}`))