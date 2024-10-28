require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsLayout = require('express-ejs-layouts');
const userRoutes = require('./routes/authRoutes');
const passport = require('passport');
const passportConfig = require('./config/passport');
const PORT = process.env.PORT || 4000;
const MongoStore = require('connect-mongo');
const session = require('express-session');

//middleware
app.use(express.urlencoded({extended: true}));
passportConfig(passport);

// session
app.use(
    session({
        secret:process.env.SECRET_KEY,
        resave:false,
        saveUninitialized:false,
        store:MongoStore.create({mongoUrl:process.env.MONGO_URL})
    })
)

// passport
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');
app.use(ejsLayout);
app.set('layout','layout/main-layout')

// routes
app.use("/auth",userRoutes);


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
