import {create} from 'zustand';
import toast from "react-hot-toast"
import {axiosInstance} from "../lib/axios"
import { useAuthStore } from './useAuthStore';


export const useChatStore=create((set,get)=>({
    message:[],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,


    getUsers:async()=>{
        set({isUsersLoading:true});
        try {
             const res=await axiosInstance("/message/users");
             set({users:res.data});
        } catch (err) {
            console.error("error in getUsers ",err);
            toast.error(err.message);
        }finally{
             set({isUsersLoading:false});
        }
    },
    getMessages:async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const res=await axiosInstance(`/message/${userId}`);
            set({message:res.data});
        } catch (err) {
            console.error("error in getMessage ",err);
            toast.error(err.message);
        }finally{
            set({isMessagesLoading:false});
        }
    },
    sendMessage: async (messageData) => {
    const { selectedUser, message } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      set({ message: [...message, res.data] });
    } catch (err) {
      toast.error(err.message);
      console.error(err.message);
    }
  },
  subscribeToMessages:()=>{
       const {selectedUser}=get();
       if(!selectedUser)return;

       const socket=useAuthStore.getState().socket;
       socket.on("newMessage",(newMessage)=>{
        //newMessage is the user which send the message
        if(newMessage.senderId!==selectedUser._id)return;
        set({
            message:[...get().message,newMessage],
        });
       });
  },
  unsubscribeFromMessages:()=>{
        const {selectedUser}=get();
       if(!selectedUser)return;

       const socket=useAuthStore.getState().socket;
       socket.off("newMessage");
  },
    setSelectedUser:(selectedUser)=>set({selectedUser}),
}))