import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import messageRoutes from "./routes/message.route.js"

dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);
app.get("/",(req,res)=>{
    res.send("root");
});
app.listen(PORT, () => {
  console.log("server is running on PORT: "+PORT );
  connectDB();
});