const File = require("../models/File")
const Post = require("../models/Post")

exports.getPosts = (req,res)=>{
    res.render('post/posts',{
            title:'Posts'
        })
}

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
    if (!req.files || req.files.length === 0) {
        return res.render('post/addPost', {
            title: "Add Post",
            error: "Image field is required"
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
        res.render('post/posts', {
            title: 'Add Post',
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

