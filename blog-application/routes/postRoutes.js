const express = require('express');
const postRoutes = express.Router();
const {getPosts,addPostsForm,addPosts,getPostsById,getEditPostForm,updatePost,deletePost} = require('../controllers/postController');
const upload = require('../config/multer');
const isAuthenticated = require('../middlewares/isAuthenticated');

postRoutes.get('/', getPosts);

postRoutes.get('/add',addPostsForm);

postRoutes.post('/add',upload.array('images',5), addPosts);

postRoutes.get('/:id', getPostsById);

postRoutes.get('/:id/edit', getEditPostForm);

postRoutes.put('/:id',upload.array("images",5), updatePost);

postRoutes.delete('/:id',deletePost);


module.exports = postRoutes;