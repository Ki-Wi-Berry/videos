import express from "express";
import cors from "cors";
import useRouter from "./router/user_router.js";

const app=express();
app.use(cors());  
// 解析表单中间件
app.use(express.urlencoded({extended:false}));

app.use("/api",useRouter);  

app.listen(3007,()=>{
    console.log("http://127.0.0.1:3007")
})