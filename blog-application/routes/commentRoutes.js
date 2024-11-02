const express =  require('express');
const { addComment } = require('../controllers/commentController');
const commentRoutes = express.Router();

commentRoutes.post('/posts/:id/comments',addComment);

module.exports = commentRoutes;