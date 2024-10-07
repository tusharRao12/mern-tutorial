const express = require('express');
const app = express();
const PORT = 3000;
const userRoute = require('./Routes/UserRoutes');

app.get('/',(req,res)=>{
    res.send("Hello World");
})


app.use('/users',userRoute)


app.listen(PORT,()=>{
    console.log(`Server is listeninng on port ${PORT}`)
})