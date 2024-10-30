const File = require("../models/File")
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
        error:'',
        success:''
    })
}
exports.addPosts = async (req, res) => {
    const { title, content } = req.body;
    if(!req.files || req.files.lenght === 0){
        return res.render('post/addPost',{
            title:"Add Post",
            error:"Image field is reuqired"
        })
    }
    const images = await Promise.all(req.files.map(async(file)=>{
        const newFile = new File({
            url:file.path,
            public_id:file.filename,
            uploaded_by:req.session.userId
        });
        await newFile.save();
        console.log(newFile);
        return {
            url:newFile.url,
            public_id:newFile.public_id,
        }
    }))

    const newPost = new Post({
        title,
        content,
        author:req.session.userId,
        images,
    });
    await newPost.save();
    res.render('post/addPost',{
        title:'Posts',
        success:"Post created Sucssesfuly"
    });
};
