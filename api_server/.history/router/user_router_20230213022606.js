import express from "express";
const router=new express.Router();
import {regUser} from "../router_hander/user_ctrl.js"
import {loginUser} from "../router_hander/user_ctrl.js"
import {GetInfo} from "../router_hander/user_ctrl.js"

//注册新用户
router.post('/user_register',regUser);

// 登录
router.get('/user_login', loginUser);

// 获取用户信息
router.get('/get_info', GetInfo);


export default router;