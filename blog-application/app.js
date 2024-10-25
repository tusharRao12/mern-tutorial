const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

app.set('view engine','ejs');
app.use(ejsLayout);
app.set('layout','layout/main-layout')


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
