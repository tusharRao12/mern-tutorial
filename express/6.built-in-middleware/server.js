const express = require('express');
const app = express();
const PORT = 8082;

//?----------Built in Middlewares

//! For serve static files
// app.use(express.static()) 

//! Pass incoming data
// app.use(express.json())

//! Pass incoming url 
// app.use(express.urlencoded())

//?----------------App level middleware
// Logging details of every request
const logRequest = (req,res,next)=>{
    console.log(`Request recied at: ${new Date().toISOString()} for ${req.method} to ${req.path}`);
    next()
};
app.use(logRequest);

app.get('/',(req,res)=>{
    res.json({
        message:"Welcome to this app"
    })
})
app.post('/books',(req,res)=>{
    res.json({
        message:"Build in middleware demo"
    })
})


app.listen(PORT, console.log(`Server is ruuning on ${PORT}`))