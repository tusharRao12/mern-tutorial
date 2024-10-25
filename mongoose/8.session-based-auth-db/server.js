const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs'); 
const session = require('express-session');
const MongoStore = require('connect-mongo');

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

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({
    secret: '234434dsf',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000 // 1 hour in milliseconds
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/node_crud'
    })
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.userData) {
        return next();
    } else {
        res.redirect('/login');
    }
};

// Middleware to check if user has admin role
const isAdmin = (req, res, next) => {
    if (req.session.userData && req.session.userData.role === 'admin') {
        return next();
    } else {
        res.send("Access denied: Admins only");
    }
};

// Routes
app.get('/', (req, res) => {
    res.render('home');
});

// Login and Register routes don't need authentication middleware
app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    await User.create({
        username,
        password: hashedPassword,
    });
    res.redirect('/login');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const userFound = await User.findOne({ username });

    if (userFound && await bcryptjs.compare(password, userFound.password)) {
        req.session.userData = {
            username: userFound.username,
            role: userFound.role
        };
        res.redirect('/dashboard');
    } else {
        res.send('Invalid login details');
    }
});

// Dashboard route: requires authentication
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.render('dashboard', { username: req.session.userData.username });
});

// Admin-only route
app.get('/admin', isAuthenticated, isAdmin, (req, res) => {
    res.send('Welcome Admin!');
});

// Logout route
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

// Start the server
app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
