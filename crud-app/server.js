const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const session = require('express-session');
const ejsLayout = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 4000;
const URI = process.env.DB_URI;
const router = require('./routes/Routes')
// const path = require('path');
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static('uploads'))
const connectTODB = async()=>{
    try{
        await mongoose.connect(URI);
        console.log("Mongo db connect")
    }catch(error){
        console.log(error)
    }
}
connectTODB();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
})
);

app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.set('view engine','ejs');
app.use(ejsLayout);
app.set('layout','layout/main-layout')



app.use('',router)



app.listen(PORT, ()=>{
    console.log(`Server started at http://localhost:${PORT}`)
});