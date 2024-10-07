const express = require('express');
const app = express();
const PORT = 3000;
const userRouter = require('./Routes/UserRoutes');
const isAuthenticated = require('./middleware/isAuthenticated');

app.get('/',(req,res)=>{
    res.send("Hello World");
})


app.use('/users',isAuthenticated,userRouter)


app.listen(PORT,()=>{
    console.log(`Server is listeninng on port ${PORT}`)
})