const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // setTimeout(() => {
    //     socket.emit('myCustomEvent', {description:'A custom message from server side!'});
    // }, 3000);

    socket.on('myCustomClientEvent', (data)=>{
        console.log(data)
    })

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
