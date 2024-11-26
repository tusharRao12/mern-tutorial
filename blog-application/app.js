require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsLayout = require('express-ejs-layouts');
const userRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const sessionConfig = require('./config/sessionConfig');
const authMiddleware = require('./middlewares/authMiddleware');
const commentRoutes = require('./routes/commentRoutes');
const methodOverride = require('method-override');
const profileRoute = require('./routes/profileRoute');
const likeDislikeRoutes = require('./routes/likeDislikeRoutes');
const path = require('path')
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(sessionConfig);
app.use(authMiddleware);
app.use(methodOverride('_method'))
app.use((req, res, next) => {
    res.locals.error = '';   
    res.locals.success = ''; 
    next();
});


// Template
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(ejsLayout);
app.set('layout', 'layout/main-layout');

// Routes
app.use("/auth", userRoutes);
app.use('/posts',postRoutes);
app.use('/user', profileRoute)
app.use('/',commentRoutes);
app.use('/posts',likeDislikeRoutes);
app.get('/',(req,res)=>{
    res.render('home',{ title: 'Home'})
})


// Connection
const connectTODB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("Database connection failed:", error);
    }
};

connectTODB();
