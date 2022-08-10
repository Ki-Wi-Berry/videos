//导入express
import express from "express";
import cors from "cors";

const app=express();

app.listen(3007,()=>{
    console.log("http://127.0.0.1:3007")
})