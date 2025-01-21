const express = require('express');
const upload = require('../middlewares/multerConfig'); 
const userController = require('../controllers/userController');
const chatController = require('../controllers/chatController');
const userRouter = express.Router();
const { authMiddleware, preventLoggedInAccess } = require('../middlewares/authMiddleware');


userRouter.get('/',userController.home);

userRouter.post('/save-chat',chatController.saveChat)

userRouter.get('/login',preventLoggedInAccess,userController.loginLoad);
userRouter.post('/login',userController.login);

userRouter.get('/logout',userController.logout);

userRouter.get('/register',preventLoggedInAccess,userController.registerLoad);
userRouter.post('/register',upload.single('image'), userController.register);

userRouter.get('/dashboard',authMiddleware, userController.loadDashboard);

module.exports = userRouter;
