const express = require('express');
const {getLogin,login,getRegister,register} = require('../controllers/authController');

const userRoutes = express.Router();

userRoutes.get('/login', getLogin)

userRoutes.post('/login', login)

userRoutes.get('/register', getRegister)

userRoutes.post('/register', register);


module.exports = userRoutes;