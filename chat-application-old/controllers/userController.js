const User = require('../models/userModel');
const bcrypt = require('bcrypt');

home = async (req, res) => {
    try {
        res.render('home', { title: 'Home' });
    } catch (error) {
        console.log(error.message);
    }
};

loginLoad = async (req, res) => {
    try {
        res.render('login', { title: 'Login',headerFooter: false });
    } catch (error) {
        console.log(error.message);
    }
};

login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            if (passwordMatch) {
                req.session.user = userData;
                return res.redirect('/dashboard');
            } else {
                return res.render('login', { title: 'Login', error: 'Email and password is incorrect' });
            }
        } else {
            return res.render('login', { title: 'Login', error: 'Email and password is incorrect' });
        }
    } catch (error) {
        console.log(error.message);
    }
};

registerLoad = async (req, res) => {
    try {
        res.render('register', { title: 'Register', headerFooter: false });
    } catch (error) {
        console.log(error.message);
    }
};


const register = async (req, res) => {
    try {
        const existingUser = await User.findOne({
            $or: [
                { email: req.body.email },
                { phone: req.body.phone }
            ]
        });

        if (existingUser) {
            const errorMessage = 'A user with this email or phone number already exists.';
            return res.render('register', { error: errorMessage ,title:'Register'}); 
        }
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            dateOfBirth: req.body.dateOfBirth,
            image: req.file ? 'images/uploads/' + req.file.filename : null,
            password: passwordHash,
        });
        await user.save();
        req.session.user = user;
        return res.redirect('/dashboard');
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('An error occurred during registration.');
    }
};


logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err.message);
            } else {
                res.redirect('/login');
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};

loadDashboard = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        const users = await User.find({
            _id: { $nin: [req.session.user._id] }
        }).select('name email phone dateOfBirth image is_online'); 

        res.render('dashboard', {
            title: 'Dashboard',
            user: req.session.user,
            users: users 
        });
    } catch (error) {
        console.log(error.message);
    }
};


module.exports = {
    registerLoad,
    register,
    loginLoad,
    login,
    logout,
    loadDashboard,
    home,
};
