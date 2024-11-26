const File = require("../models/File");
const Post = require("../models/Post");
const cloudinary = require('../config/cloudinary');
const Comment = require("../models/Comment");
const LikeDislike = require("../models/LikeDislike");

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username"); 
        
        res.render('post/posts', {
            title: 'Posts',
            posts 
        });
    } catch (error) {
        res.status(500).render("error", { title: "Error", error: "Unable to load posts" });
    }
};

exports.addPostsForm = (req,res)=>{
    res.render('post/addPost',{
        title:'Add Posts',
        error:'',
        success:''
    })
}
exports.addPosts = async (req, res) => {
    const { title, content } = req.body;

    if (!req.session.userId) {
        return res.redirect('/auth/login');
    }
    
    if (!title || !content) {
        return res.render('post/addPost', {
            title: "Add Post",
            error: "Title and Content fields are required."
        });
    }

    if (!req.files || req.files.length === 0) {
        return res.render('post/addPost', {
            title: "Add Post",
            error: "Image field is required."
        });
    }

    try {
        const images = await Promise.all(req.files.map(async (file) => {
            const newFile = new File({
                url: file.path,
                public_id: file.filename,
                uploaded_by: req.session.userId
            });
            await newFile.save();
            return {
                url: newFile.url,
                public_id: newFile.public_id,
            };
        }));

        const newPost = new Post({
            title,
            content,
            author: req.session.userId,
            images,
        });

        await newPost.save();
        res.render('post/addPost', {
            title: 'Posts',
            success: "Post created successfully!"
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.render('post/addPost', {
            title: "Add Post",
            error: "An error occurred while creating the post. Please try again."
        });
    }
};


exports.getPostsById = async (req, res) => {
    try {
        const postId = req.params.id;

        // Find the post and populate the necessary data
        const post = await Post.findById(postId)
            .populate("author", "username")
            .populate({
                path: "comments",
                populate: {
                    path: "author",
                    model: "User",
                    select: "username",
                },
            });

        // Count the number of likes and dislikes for the post
        const likeCount = await LikeDislike.countDocuments({ post: postId, type: 'like' });
        const dislikeCount = await LikeDislike.countDocuments({ post: postId, type: 'dislike' });

        // Pass the like and dislike counts to the view
        res.render("post/post", {
            title: 'Post',
            post,
            userId: req.session.userId,
            likeCount,
            dislikeCount,
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).render("error", {
            title: "Error",
            error: "An error occurred while retrieving the post.",
        });
    }
};




exports.getEditPostForm = async (req,res)=>{
    const post = await Post.findById(req.params.id);
    if(!post){
        return res.render('post/post',{
            title:'Post',
            post,
            error:"Post not found"
        });
    }
    res.render('post/editPost',{
        title:'Edit Post',
        post,
    })
}

exports.updatePost = async (req, res) => {
    const { title, content } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.render('post/post', {
            title: 'Post',
            post,
            error: 'Post not Found',
        });
    }

    if (post.author.toString() !== req.session.userId.toString()) {
        return res.render('post/postDetails', {
            title: 'Post',
            post,
            error: 'You are not authorized to edit this post',
        });
    }

    post.title = title || post.title;
    post.content = content || post.content;
    if (req.files && req.files.length > 0) {
        await Promise.all(
            post.images.map(async (image) => {
                await cloudinary.uploader.destroy(image.public_id);
            })
        );
        post.images = await Promise.all(
            req.files.map(async (file) => {
                const newFile = new File({
                    url: file.path,
                    public_id: file.filename,
                    uploaded_by: req.session.userId,
                });
                await newFile.save();
                return {
                    url: newFile.url,
                    public_id: newFile.public_id,
                };
            })
        );
    }

    await post.save();
    res.redirect(`/posts/${post._id}`);
};


exports.deletePost = async (req, res) => {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
        return res.render('post/post', {
            title: 'Post',
            post,
            error: 'Post not found'
        });
    }

    if (post.author.toString() !== req.session.userId.toString()) {
        return res.render('post/post', {
            title: 'Post',
            post,
            error: 'You are not authorized to delete this post'
        });
    }
    await Promise.all(
        post.images.map(async (image) => {
            await cloudinary.uploader.destroy(image.public_id);
        })
    );
    await Comment.deleteMany({ post: req.params.id });
    await Post.findByIdAndDelete(req.params.id);

    res.redirect('/posts');
};
