import mongoose from "mongoose";

export const connectDB =async()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGO_URL);
        console.log(`mongoDB connected ${conn.connection.host}`);
          
    }catch(error)
    {
        console.error("error occured during connection",error);
    }
};