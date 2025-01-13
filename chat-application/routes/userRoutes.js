const express = require('express');
const upload = require('../middlewares/multerConfig'); 
const userController = require('../controllers/userController');
const userRouter = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');


userRouter.get('/login', userController.loginLoad);
userRouter.post('/login', userController.login);

userRouter.get('/logout', userController.logout);

userRouter.get('/register', userController.registerLoad);
userRouter.post('/register', upload.single('image'), userController.register);

userRouter.get('/dashboard', authMiddleware, userController.loadDashboard);

module.exports = userRouter;
