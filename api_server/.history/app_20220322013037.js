import express from "express";
import cors from "cors";
import useRouter from "./router/user_router.js";
import bodyparser from "body-parser"
import config from "./config.js"
import expressJWT from "express-jwt";

const app=express();
app.use(cors());  
// 解析表单中间件
app.use(express.urlencoded({extended:true}));
app.use(bodyparser.json());

app.use(expressJWT({secret:config.jwtSecretKey}))

app.use("/api",useRouter);  

app.use((err,req,res,next)=>{
    if(err.name=='UnauthorizedError') return res.send({
        
    })
})

app.listen(3007,()=>{
    console.log("http://127.0.0.1:3007")
})