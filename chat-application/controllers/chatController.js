const User = require('../models/userModel');
const Chat = require('../models/chatModel');

saveChat = async (req, res) => {
    try{
        var chat = new Chat({
            sender_id:req.body.sender_id,
            receiver_id:req.body.receiver_id,
            message:req.body.message,
        });

        var newChat = await chat.save();
        res.status(200).send({success:true,msg:'Chat inserted',data:newChat});

    }catch(error){
        res.status(400).send({success:false,msg:error.message});
    }
}    

deleteChat = async (req,res) =>{
    try{
        await Chat.deleteOne({_id:req.body.id});
        res.status(200).send({success:true});
    }catch(error){
        res.status(400).send({success:false,msg:error.message});
    }
}

updateChat = async (req,res) =>{
    try{
        await Chat.findByIdAndUpdate({_id:req.body.id },{
            $set:{
                message:req.body.message
            }
        })
        res.status(200).send({success:true});
    }catch(error){
        res.status(400).send({success:false,msg:error.message});
    }
}

module.exports = {
    saveChat,
    deleteChat,
    updateChat
};
