import express from "express";
const router=new (express.Router() as any);
import {regUser,loginUser,GetInfo} from "../router_handle/user_ctrl.js"


//注册新用户
router.post('/user_register',regUser);

// 登录
router.post('/user_login', loginUser);

// 获取用户信息
router.get('/get_info', GetInfo);


export default router;