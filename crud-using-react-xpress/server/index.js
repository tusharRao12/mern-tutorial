const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', (req,res)=>{
    res.send('hello');
})

app.listen(8080, ()=>{
    console.log('Server is listening on port 8080')
})