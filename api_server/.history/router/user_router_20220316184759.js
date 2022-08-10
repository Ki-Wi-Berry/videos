import express from "express";
const router=new express.Router();
import {getAllUser} from "../router_hander/user_ctrl.js"

//注册新用户
router.post('/user_register', (req, res) => {
    res.send("OK user_register");
})

router.post("/user",getAllUser);

// 登录
router.post('/user_login', (req, res) => {
    res.send("OK user_register");
})

export default router;