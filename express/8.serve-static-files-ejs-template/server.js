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

// Render user data
app.get('/user',(req,res)=>{
    // dummy user content
    const userData = {
        username:"Tushar",
        age:25,
        isPremiumUser:false,
        email:"tushar@gmail.com",
        isLogin:true
    }
    res.render('userData',userData);
});

app.get('/products',(req,res)=>{
    const products = [
        {
            name:'Laptop',
            price:'299999'
        },
        {
            name:'Phone',
            price:'19999'
        },
        {
            name:'Tv',
            price:'9999'
        },
    ]
    res.render('products',{products})
})


app.listen(PORT, console.log(`Server is ruuning on ${PORT}`))