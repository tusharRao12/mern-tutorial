const express = require('express')
const app = express();
const PORT = 8082;

// Reciving incoming data from the client configration
app.use(express.json())

const books = [
    {id:'1',title:'The great Gatsby',author:'F.Scott'},
    {id:'2',title:'The Moby Dic',author:'Herman'},
    {id:'3',title:'The Mernstack',author:'Tushar'},
    {id:'4',title:'The Boys',author:'Rao'}
]

app.get('/',(req,res)=>{
    res.json({
        status:'success',
        message:'Welcome to book api using express'
    })
})

app.get('/books',(req,res)=>{
    res.json({
        status:'sucess',
        message:'Books fetched successfull',
        data:books
    })
})

app.get('/books/:id',(req,res)=>{
    const id = req.params.id;
    const bookFound = books.find((book)=>book.id ===id);
    if(!bookFound){
        return res.json({
            status:'failed',
            message:`Book with id ${id} not found`,
        })
    }
    res.json({
        status:'sucess',
        message:'Books fetched successfull',
        data:bookFound
    })
})
app.post('/books',(req,res)=>{
    const newBook = req.body;
    books.push(newBook);
    res.json({
        status:'sucess',
        message:'Books created successfull',
        dat:books
    })
})



app.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);  
});