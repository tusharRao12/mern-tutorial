const Post = require("../models/Post")

exports.getPosts = (req,res)=>{
    res.render('post/posts',{
            title:'Posts',
            error:''
        })
}

exports.addPostsForm = (req,res)=>{
    res.render('post/addPost',{
        title:'Add Posts',
        error:''
    })
}
exports.addPosts = async (req, res) => {
    const { title, content } = req.body;

    try {
        if (!req.session.userId) {
            return res.redirect('/auth/login');
        }

        const newPost = await Post.create({
            title,
            content,
            author: req.session.userId
        });

        res.redirect('/post');
    } catch (error) {
        res.render("post/addPost", {
            title: "Add Post",
            error: error.message,
        });
    }
};
