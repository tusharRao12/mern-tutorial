const mongoose = require('mongoose');

const likeDislikeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: { // 'like' or 'dislike'
        type: String,
        enum: ['like', 'dislike'],
        required: true,
    }
}, {
    timestamps: true,
});

const LikeDislike = mongoose.model('LikeDislike', likeDislikeSchema);
module.exports = LikeDislike;
