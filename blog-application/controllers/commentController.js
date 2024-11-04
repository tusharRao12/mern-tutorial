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

exports.getCommentForm = async (req,res)=>{
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        return res.render('post/post',{
            title:'Post',
            comment,
            error:'Post not found',
        });
    }
    res.render('post/editComment',{
        title:'Comment',
        comment,
    });
}

exports.updateComment = async(req,res)=>{
    const {content} = req.body;
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        return res.render('post/post',{
            title:'Post',
            comment,
            error:'Comment not found'
        })
    }
    if(comment.author.toString() !==req.session.userId.toString()){
        return res.render('post/post',{
            title:'Post',
            comment,
            error:'You are not authorized to edit this comment'
        });
    }
    comment.content = content || comment.content;
    await comment.save();
    res.redirect(`/posts/${comment.post}`);
}

exports.deleteComent = async(req,res)=>{
    const comment = await Comment.findById(req.params.id);
    if(!comment){
        return res.render('post/post',{
            title:'Post',
            comment,
            error:'Comment not found'
        });
    }
    if(comment.author.toString() !==req.session.userId.toString()){
        return res.render('post/post',{
            title:'Post',
            comment,
            error:'Ypu are not authorized to delete this comment',
        });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.redirect(`/posts/${comment.post}`);
}