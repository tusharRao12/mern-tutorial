const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.addComment = async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;

    if (!req.session.userId) {
        const post = await Post.findById(postId).populate('author').populate({
            path: 'comments',
            populate: { path: 'author', select: 'username' }
        });
        return res.render('post/post', {
            title: "Post",
            post,
            userId: req.session.userId,
            error: "You have to log in first to comment."
        });
    }

    const post = await Post.findById(postId).populate('author').populate({
        path: 'comments',
        populate: { path: 'author', select: 'username' }
    });
    if (!post) {
        return res.render('post/post', {
            title: "Post",
            post,
            userId: req.session.userId,
            error: "Post not found"
        });
    }

    if (!content) {
        return res.render('post/post', {
            title: "Post",
            post,
            userId: req.session.userId,
            error: "Comment can't be empty"
        });
    }

    try {
        const comment = new Comment({
            content,
            post: postId,
            author: req.session.userId,
        });
        await comment.save();

        post.comments.push(comment._id);
        await post.save();

        res.redirect(`/posts/${postId}`);
    } catch (error) {
        console.error(error);
        res.render('post/post', {
            title: "Post",
            post,
            userId: req.session.userId,
            error: "An error occurred while adding your comment."
        });
    }
};


