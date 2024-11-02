const File = require("../models/File")
const Post = require("../models/Post")

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
        const post = await Post.findById(req.params.id).populate("author", "username");
        
        res.render("post/post", {
            title: 'Post',
            post,
            userId: req.session.userId, 
        });
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).render("error", {
            title: "Error",
            error: "An error occurred while retrieving the post."
        });
    }
};
