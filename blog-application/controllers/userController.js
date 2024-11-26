const Post = require("../models/Post");
const User = require("../models/User")
const File = require("../models/File")
const cloudinary = require('../config/cloudinary');
const Comment = require("../models/Comment");

exports.getUserProfile = async (req,res)=>{
    const user = await User.findById(req.session.userId).select("-password");
    if(!user){
        return res.render('auth/login',{
            title : 'Login',
            user: req.user,
            error: "User not found",
        })
    }

    const posts = await Post.find({
        author:req.session.userId
    }).sort({
        createdAt: -1,
    });
    res.render("profile/profile",{
        title:'Profile',
        user,
        posts,
        error:"",
        postCount: posts.length,
    })
}

exports.getEditUserProfile = async (req,res)=>{
    const user = await User.findById(req.session.userId).select("-password");
    if(!user){
        return res.render('auth/login',{
            title : 'Login',
            user: req.user,
            error: "User not found",
        })
    }
    res.render("profile/editProfile",{
        title:'Profile',
        user,
        error:"",
    })
}
exports.editUserProfile = async (req, res) => {
    const { username, email, bio } = req.body;
    const user = await User.findById(req.session.userId).select("-password");
    if (!user) {
        return res.render('auth/login', {
            title: 'Login',
            user: req.user,
            error: "User not found",
        });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;

    if (req.file) {
        if (user.profilePicture && user.profilePicture.public_id) {
            await cloudinary.uploader.destroy(user.profilePicture.public_id);
        }
        const file = new File({
            url: req.file.path,
            public_id: req.file.filename, 
            uploaded_by: req.session.userId,
        });

        await file.save();
        user.profilePicture = {
            url: file.url,
            public_id: file.public_id,
        };
    }

    await user.save();
    const posts = await Post.find({
        author:req.session.userId
    })
    res.render('profile/profile', {
        title: "Edit Profile",
        user,
        posts,
        success: "Profile updated successfully",
        postCount: posts.length,
    });
};


exports.deleteUserAccount = async (req, res) => {
    const user = await User.findById(req.session.userId);
    if (!user) {
        return res.render('login', {
            title: 'Login',
            user: req.user,
            error: 'User not found',
        });
    }

    // Delete user's profile picture from Cloudinary
    if (user.profilePicture && user.profilePicture.public_id) {
        await cloudinary.uploader.destroy(user.profilePicture.public_id);
    }

    // Delete all posts and associated images, comments, and files
    const posts = await Post.find({ author: req.session.userId });
    for (const post of posts) {
        // Delete associated images for each post
        for (const image of post.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        // Delete all comments related to the post
        await Comment.deleteMany({ post: post._id });

        // Delete the post itself
        await Post.findByIdAndDelete(post._id);
    }

    // Delete all files uploaded by the user
    const files = await File.find({ uploaded_by: req.session.userId });
    for (const file of files) {
        await cloudinary.uploader.destroy(file.public_id);
    }

    // Finally, delete the user account
    await User.findByIdAndDelete(req.session.userId);

    // Clear the session and redirect to register
    req.session.destroy(() => {
        res.redirect('/auth/register');
    });
};
