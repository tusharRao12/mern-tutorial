const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.addComment = async (req,res)=>{
    const {content} = req.body;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if(!post){
        return res.render('post/post',{
            title:"Post",
            post,
            error:'Post not Found'
        });
    }
    if(!content){
        return res.render('post/post',{
            title:"Post",
            post,
            error:"Comment can't be empty"
        });
    }
    const comment = new Comment({
        content,
        post:postId,
        author:req.user.id,
    })
    await comment.save();
    post.comment.push(comment._id);
    await post.save();
    res.redirect(`/post/${postId}`);
};