const LikeDislike = require('../models/LikeDislike');
const Post = require('../models/Post');

exports.likeDislikePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.session.userId;
    const type = req.body.type;  // 'like' or 'dislike'

    try {
        // Check if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).render('error', {
                title: 'Error',
                error: 'Post not found',
            });
        }

        // Check if the user has already liked or disliked the post
        const existingInteraction = await LikeDislike.findOne({ post: postId, user: userId });

        if (existingInteraction) {
            // If the interaction already exists, we toggle it
            if (existingInteraction.type === type) {
                // If the type is the same, remove the interaction
                await LikeDislike.findByIdAndDelete(existingInteraction._id);
            } else {
                // If the type is different, update it (e.g., like -> dislike or dislike -> like)
                existingInteraction.type = type;
                await existingInteraction.save();
            }
        } else {
            // If no interaction exists, create a new one
            const likeDislike = new LikeDislike({
                post: postId,
                user: userId,
                type,
            });
            await likeDislike.save();
        }

        // Redirect back to the post page
        res.redirect(`/posts/${postId}`);
    } catch (error) {
        console.error(error);
        res.status(500).render('error', {
            title: 'Error',
            error: 'An error occurred while interacting with the post.',
        });
    }
};
