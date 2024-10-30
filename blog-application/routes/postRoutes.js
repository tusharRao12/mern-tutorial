const express = require('express');
const postRoutes = express.Router();
const {getPosts,addPostsForm,addPosts} = require('../controllers/postController');
// const isAuthenticated = require('../middlewares/isAuthenticated');

postRoutes.get('/', getPosts);

postRoutes.get('/add',addPostsForm);

postRoutes.post('/add', addPosts);



module.exports = postRoutes;