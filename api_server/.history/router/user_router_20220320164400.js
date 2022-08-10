import express from "express";
const router=new express.Router();
import {regUser} from "../router_hander/user_ctrl.js"

//注册新用户
router.post('/user_register',regUser);

// 登录
router.post('/user_login', loginUser);

export default router;