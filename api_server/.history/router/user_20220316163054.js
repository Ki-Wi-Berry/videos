import express from "express";
const router = express.Router();

//注册新用户
router.post('/user_register', (req, res) => {
    res.send("OK user_register");
})

router.post('/user_login', (req, res) => {
    res.send("OK user_register");
})