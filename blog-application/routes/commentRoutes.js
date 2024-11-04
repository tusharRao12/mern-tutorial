const express =  require('express');
const { addComment,getCommentForm,updateComment,deleteComent } = require('../controllers/commentController');
const commentRoutes = express.Router();

commentRoutes.post('/posts/:id/comments',addComment);

commentRoutes.get('/comments/:id/edit',getCommentForm);

commentRoutes.put('/comments/:id/',updateComment);

commentRoutes.delete('/comments/:id/',deleteComent);

module.exports = commentRoutes;