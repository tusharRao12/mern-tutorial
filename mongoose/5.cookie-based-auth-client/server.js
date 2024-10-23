const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

//! Middleware 
app.use(express.urlencoded({ extended: true }));

//! Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

//! Simulated database of users
const users = [
    { username: 'Tushar', password: '123', role: 'admin' },
    { username: 'Nikhil', password: '456', role: 'user' }
];

//! Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;
    if (userData && userData.username) {
        // If the user is logged in, redirect to the dashboard
        return res.redirect('/dashboard');
    }
    next(); // Proceed to the next middleware/route if not logged in
};

//! Routes

app.get('/', (req, res) => {
    res.render('home');
});

// Apply `isAuthenticated` middleware to login route to prevent logged-in users from accessing it
app.get('/login', isAuthenticated, (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    // ! Find the user login details
    const userFound = users.find((user) => {
        const { username, password } = req.body;
        return user.username === username && user.password === password;
    });

    // ! Create some cookies (cookie);
    if (userFound) {
        // Prepare the login user data and set the cookie
        res.cookie('userData', JSON.stringify(userFound), {
            maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
            httpOnly: true,
            secure: false,
            sameSite: 'strict'
        });

        // Redirect to the dashboard after successful login
        res.redirect('/dashboard');
    } else {
        // Redirect back to login page if login fails
        res.redirect('/login');
    }
});

app.get('/dashboard', (req, res) => {
    // ! Grab the user from the cookie
    const userData = req.cookies.userData ? JSON.parse(req.cookies.userData) : null;

    // ! Check if userData exists before accessing its properties
    if (userData && userData.username) {
        // Render the dashboard with the username
        res.render('dashboard', { username: userData.username });
    } else {
        // ! Redirect to login if userData doesn't exist
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    // Clear the user cookie and redirect to the login page
    res.clearCookie('userData');
    res.redirect('/login');
});

app.listen(3000, () => console.log('Server is running on http://localhost:3000'));
