import { generateToken } from "../lib/utils.js";
import User from "../models/user.models.js"

import bcrypt from "bcryptjs";

export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body
    try{
        if(!fullName||!email||!password){
             return res.status(400).json({message:"not complete data"});
        }
          if(password.length<6)
          {
            return res.status(400).json({message:"Password must be at least 6 characters"});
          }
          const user=await User.findOne({email});
          if(user) return res.status(400).json({message:"Email already exisits"});
          const salt=await bcrypt.genSalt(10);

          const hashedPassword=await bcrypt.hash(password,salt);

          const newUser=new User({
            fullName,
            email,
            password:hashedPassword
          })

          if(newUser)
          {
                generateToken(newUser._id,res);
                await newUser.save();

                res.status(200).json({
                    _id:newUser._id,
                    fullName:newUser.fullName,
                    email:newUser.email,
                    profilePic:newUser.profilePic,
                });
          }else{
            res.status(400).json({message:"Invalid user data"});
        }
    }catch(err)
    {
        console.error("error in signup controller ",err.message);
        res.status(500).json({message:"Internal Server error"});
    }
};
export const login=async(req,res)=>{
    const {email,password}=req.body
    try{
        if(!email||!password){
             return res.status(400).json({message:"not complete data"});
        }
          const user=await User.findOne({email});
          if(!user) return res.status(400).json({message:"Invalid crediantial"});
         
           const isPasswordCorrect=await bcrypt.compare(password,user.password);
           if(!isPasswordCorrect)
            {
                return res.status(400).json({message:"Invalid crediantial"});
            }   
            
            generateToken(user._id,res);

             res.status(200).json({
                    _id:user._id,
                    fullName:user.fullName,
                    email:user.email,
                    profilePic:user.profilePic,
                });
    }catch(err)
    {
        console.error("error in login controller ",err.message);
        res.status(500).json({message:"Internal Server error "+err.message});
    }
};
export const logout=(req,res)=>{
    try{
        res.cookie("jwt","",{maxAGE:0});
         res.status(200).json({message:"Logged out successfully"});
    }catch(error)
    {
         console.log("Error in log out controller ",error.message);
         res.status(500).json({message:"Internal Server error "+err.message});
    }
};

export const UpdateProfile=async(req,res)=>{
   const {email,password,fullName,profilePic}=req.body;
   try{
          if(password.length<6)
          {
            return res.status(400).json({message:"Password must be at least 6 characters"});
          }
          const user=await User.findOne({email});
          const salt=await bcrypt.genSalt(10);

          const hashedPassword=await bcrypt.hash(password,salt);

          const newUser=new User({
            fullName,
            email,
            password:hashedPassword
          })

          if(newUser)
          {
                generateToken(newUser._id,res);
                await newUser.save();

                res.status(200).json({
                    _id:newUser._id,
                    fullName:newUser.fullName,
                    email:newUser.email,
                    profilePic:newUser.profilePic,
                });
          }else{
            res.status(400).json({message:"Invalid user data"});
        }

   }catch(err)
   {
    res.status(500),json({message:"Internal Server error"});
   }
};









