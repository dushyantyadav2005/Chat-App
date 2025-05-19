import User from "../models/user.models.js";
import Message from "../models/message.models.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers);
    }catch(err)
    {
        console.error("Error in getUsersForSidebar: ",err.message);
        res.status(500).json({error:"Internal server error"});
    }
}
export const getMessages=async(req,res)=>{
    try{
        const {id:UserToChatId}=req.params;
        const MyId=req.user._id;
        console.log(MyId);
        console.log(UserToChatId);
        const messages=await Message.find({
            $or:[
                {senderId:MyId,receiverId:UserToChatId},
                {senderId:UserToChatId,receiverId:MyId},
            ]
        })
        res.status(200).json(messages);
    }catch(err)
    {
        console.error("Error in getUsersForSidebar: ",err.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;

        if(image)
        {
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        //socketio sending realtime functionality

        res.status(201).json(newMessage);
    } catch (err) {
        console.error("Error in sendMessage controller: ",err.message);
        res.status(500).json({error:"Internal server error"});
    }
}