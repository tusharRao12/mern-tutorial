const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Render Register Page
registerLoad = async (req, res) => {
    try {
        res.render('register', { title: 'Register' });
    } catch (error) {
        console.log(error.message);
    }
};

// Handle Registration
const register = async (req, res) => {
    try {
        const { name, email, phone, dateOfBirth, password, confirmPassword } = req.body;
        const errors = {};

        if (!name || name.trim() === '') {
            errors.name = 'Name is required.';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            errors.email = 'Valid email is required.';
        }

        if (phone && phone.length < 10) {
            errors.phone = 'Phone number must be at least 10 digits.';
        }

        if (!password || password.length < 8) {
            errors.password = 'Password must be at least 6 characters long.';
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = 'Passwords do not match.';
        }

        if (Object.keys(errors).length > 0) {
            return res.render('register', { title: 'Register', errors });
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            phone,
            dateOfBirth,
            image: 'images/' + req.file.filename, 
            password: passwordHash
        });

        await user.save();

        res.render('register', {
            title: 'Register',
            message: 'Registration Successful'
        });
    } catch (error) {
        console.log(error.message);
        res.render('register', { title: 'Register', error: 'An error occurred while registering.' });
    }
};

module.exports = {
    registerLoad,
    register
};
