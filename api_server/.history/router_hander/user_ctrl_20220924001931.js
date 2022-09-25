import db from "../db/user_db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config.js"

export async function regUser(req, res) {
    try {
        const data = req.body;
        const selectSql = "select * from users where phoneNumber=?";
        let [result] = await db.query(selectSql, data.phoneNumber)
            .catch(err => { console.log(err) });
        //号码已占用
        if (result.length > 0) {
            throw new Error(res.send({
                status: 403,
                message: "电话号码已注册过了嗷",
            }))
        }

        //对密码进行加密
        data.password = bcrypt.hashSync(data.password, 10);
        console.log(data.password);
        const insertSql = "insert into users set ?";

        const insertStr = { phoneNumber: data.phoneNumber, password: data.password };
        [result] = await db.query(insertSql, insertStr)
            .catch(err => { console.log(err) });
        if (result.affectedRows != 1) {
            res.send({
                status: 403,
                message: "请求失败",
            })
        }
        res.send({
            status: 0,
            message: "请求成功",
        })
    } catch (err) {
        res.send({
            status: 403,
            message: "请求失败",
            desc: err.message
        })

    }


}

export async function loginUser(req, res) {
    try {
        const data = req.body;
        const selectSql = "select * from users where phoneNumber=?";
        let [result] = await db.query(selectSql, data.phoneNumber)
            .catch(err => { console.log(err) });
        //无注册账号
        if (result.length == 0) {
            return res.send({
                status: 403,
                message: "无注册账号",
            })
        }

        //验证密码
        const compareResult = bcrypt.compareSync(data.password, result[0].password);
        if (compareResult == 0) {
            return res.send({
                status: 403,
                message: "密码错误",
            })
        }

        const user = { ...result[0], password: '' };
        console.log(user);
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: "10h" });
        return res.send({
            status: 0,
            message: "登录成功",
            token: tokenStr
        })
    } catch (err) {
        return res.send({
            status: 403,
            message: "请求失败",
            desc: err.message
        })

    }
}

export async function GetInfo(req, res) {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
        return res.send({
            status: 403,
            message: "无token"
        })
    }
    try{
        const flag = jwt.verify(token, config.jwtSecretKey);
        if (flag) {
            return res.send({
                status: 0,
                message: "验证成功"
            })
        } else {
            return res.send({
                status: 403,
                message: "token错误"
            })
        }
    }catch(err){
        return res.send({
            status: 403,
            message: "token已过期"
        })
    }
    
}

