const express = require('express')

// ! instance
const app = express();

// create a port

const PORT = 8082

// Define the route handler

app.get('/',(req,res)=>{
    res.send("Hello word");
})

// ? start the server

app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);  
});