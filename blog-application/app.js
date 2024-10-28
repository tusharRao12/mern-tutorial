require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsLayout = require('express-ejs-layouts');
const userRoutes = require('./routes/authRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
    })
);

app.set('view engine', 'ejs');
app.use(ejsLayout);
app.set('layout', 'layout/main-layout');

// Routes
app.use("/auth", userRoutes);

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
