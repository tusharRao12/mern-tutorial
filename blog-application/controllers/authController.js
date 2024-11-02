const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => {
    res.render('auth/login', { title: 'Login'});
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }); 

        if (!user) {
            return res.render('login', {
                title: "Login",
                error: "User not found with that email",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('auth/login', {
                title: "Login",
                error: "Incorrect password",
            });
        }

        req.session.userId = user._id;
        req.session.username = user.username;

        return res.redirect('/');
    } catch (error) {
        return res.render('auth/login', {
            title: "Login",
            error: error.message,
        });
    }
};


exports.getRegister = (req, res) => {
    res.render('auth/register', { title: 'Register'});
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUserName = await User.findOne({ username });
        const existingUserEmail = await User.findOne({ email });

        if (existingUserName) {
            return res.render('auth/register', {
                title: 'Register',
                error: "Username already taken",
            });
        } else if (existingUserEmail) {
            return res.render('auth/register', {
                title: 'Register',
                error: "Email already exists",
            });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await User.create({
                username,
                email,
                password: hashedPassword,
            });
            res.redirect('/auth/login');
        }
    } catch (error) {
        res.render("auth/register", {
            title: "Register",
            error: error.message,
        });
    }
};


exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid'); 
        res.redirect('/auth/login'); 
    });
};
