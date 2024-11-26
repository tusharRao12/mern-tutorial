// likeDislikeRoutes.js

const express = require('express');
const likeDislikeRoutes = express.Router();
const { likeDislikePost } = require('../controllers/likeDislikeController');

// Route to like a post
likeDislikeRoutes.post('/:id/like', likeDislikePost); 

// Route to dislike a post
likeDislikeRoutes.post('/:id/dislike', likeDislikePost); 

module.exports = likeDislikeRoutes;
