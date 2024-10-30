const express = require('express');
const {getLogin,login,getRegister,register,logout} = require('../controllers/authController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const userRoutes = express.Router();

userRoutes.get('/login',isAuthenticated, getLogin)

userRoutes.post('/login', login)

userRoutes.get('/register',isAuthenticated, getRegister)

userRoutes.post('/register', register);

userRoutes.get('/logout', logout);



module.exports = userRoutes;