const express = require('express');
const upload = require('../middlewares/multerConfig'); 
const userController = require('../controllers/userController');

const userRouter = express.Router();
userRouter.get('/login',userController.loginLoad);
userRouter.get('/register',userController.registerLoad);
userRouter.post('/register',upload.single('image'),userController.register);

module.exports = userRouter;
