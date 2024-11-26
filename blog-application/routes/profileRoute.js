const express = require('express');
const {getUserProfile,getEditUserProfile,editUserProfile,deleteUserAccount} = require('../controllers/userController');
const upload = require('../config/multer');

const profileRoute = express.Router();

profileRoute.get('/profile',getUserProfile)

profileRoute.get('/edit',getEditUserProfile)

profileRoute.post('/edit', upload.single('profilePicture'), editUserProfile)

profileRoute.post('/delete', deleteUserAccount)



module.exports = profileRoute;