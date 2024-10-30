const express = require('express');
const postRoutes = express.Router();
const {getPosts,addPostsForm,addPosts} = require('../controllers/postController');
const upload = require('../config/multer');
// const isAuthenticated = require('../middlewares/isAuthenticated');

postRoutes.get('/', getPosts);

postRoutes.get('/add',addPostsForm);

postRoutes.post('/add',upload.array('images',5), addPosts);



module.exports = postRoutes;