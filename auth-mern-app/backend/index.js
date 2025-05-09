const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const bodyParser = require('body-parser');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
require('./Models/db');

app.get('/ping',(req,res)=>{
    res.send('PONG');
})

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})