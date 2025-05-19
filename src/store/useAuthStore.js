import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore=create((set)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data})
        }catch(err)
        {
            console.error("Error in checkAuth: ",err);
             set({authUser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },
    signup:async(data)=>{
        set({isSigningUp:true});
       try {
           const res=await axiosInstance.post("/auth/signup",data);
           set({authUser:res.data});
           toast.success("Account created Successfully");
       } catch (err) {
           toast.error(err.message);
           console.error("signup auth error : ",err);
       }finally{
        set({isSigningUp:false});
       }
    },
    login:async(data)=>{
        set({isLoggingIn:true});
        try {
            // console.log(data);
            const res=await axiosInstance.post("/auth/login",data);
           set({authUser:res.data});
           toast.success("Account created Successfully");
        } catch (err) {
          toast.error(err.message);
           console.error("login auth error : ",err);
        }finally{
            set({isLoggingIn:false});
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
             set({authUser:null});
            toast.success("Logged out Successfully");
        } catch (err) {
            toast.error(err.message);
              console.error("logout auth error : ",err);
        }
    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true});
       try {
           const res=await axiosInstance.put("/auth/update-profile",data);
           set({authUser:res.data});
           toast.success("Profile updated successfully");
       } catch (err) {
           console.error("updateProfile auth error : ",err);
           toast.error(err.message);
           toast.error("Large image...");
       } finally{
         set({isUpdatingProfile:false});
       }
    },
}))