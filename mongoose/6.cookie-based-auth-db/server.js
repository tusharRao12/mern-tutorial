const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');  // Correctly using bcryptjs

// Connect to MongoDB
const connectTODB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/node_crud');
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};
connectTODB();

// Create schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: {
        type: String,
        default: "user",
    }
});

const User = mongoose.model('Cred', userSchema);

//! Middleware 
app.use(express.urlencoded({ extended: true }));

//! Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

//! Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;
    if (userData && userData.username) {
        return res.redirect('/dashboard');
    }
    next();
};

//! Routes
app.get('/', (req, res) => {
    res.render('home');
});

// Apply `isAuthenticated` middleware to login route
app.get('/login', isAuthenticated, (req, res) => {
    res.render('login');
});
app.get('/register', isAuthenticated, (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);  // Using bcryptjs for hashing
    await User.create({
        username,
        password: hashedPassword,
    });
    res.redirect('/login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Find the user in the database
    const userFound = await User.findOne({ username });
    
    // Verify user exists and check password using bcryptjs
    if (userFound && await bcryptjs.compare(password, userFound.password)) {  // Using bcryptjs for comparison
        // Set the user data in the cookie
        res.cookie('userData', JSON.stringify(userFound), {
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
        });

        // Redirect to dashboard
        res.redirect('/dashboard');
    } else {
        res.send('Invalid login details');
    }
});

app.get('/dashboard', (req, res) => {
    const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;
    if (userData && userData.username) {
        res.render('dashboard', { username: userData.username });
    } else {
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('userData');
    res.redirect('/login');
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
