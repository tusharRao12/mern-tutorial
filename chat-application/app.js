require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const session = require('express-session');
const { SESSION_SECRET } = process.env;
const PORT = process.env.PORT || 4000;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const User = require('./models/userModel');
const Chat = require('./models/chatModel');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    session({
        secret: SESSION_SECRET || 'KeyboardCat',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60000 * 60 * 24 }, 
    })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(ejsLayouts)
app.set('layout','layouts/mainLayout')

var usp = io.of('/user-namespace');
usp.on('connection',async function(socket){
    var userId = socket.handshake.auth.token;
    await User.findByIdAndUpdate({_id:userId},{$set:{is_online:'1'}});
    socket.broadcast.emit('getOnlineUser',{user_id:userId});
    socket.on('disconnect',async function(){
        await User.findByIdAndUpdate({_id:userId},{$set:{is_online:'0'}});
        socket.broadcast.emit('getOfflineUser',{user_id:userId});
    });
    //chat implementation
    socket.on('newChat', function(data){
        socket.broadcast.emit('loadNewChat',data);
    });
    // load old chats
    socket.on('existsChat',async function(data){
        var chats = await Chat.find({ $or:[
            { sender_id:data.sender_id,receiver_id:data.receiver_id },
            { sender_id:data.receiver_id,receiver_id:data.sender_id },
        ]});

        socket.emit('loadChats', {chats:chats});
    });

});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');

        http.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1);
    }
};

connectToDB();
