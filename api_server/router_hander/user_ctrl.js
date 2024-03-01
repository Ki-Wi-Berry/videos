import db from "../db/user_db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import { checkIfExists, addColumnIfNotExists } from "../hook/hook.js";

export async function regUser(req, res) {
  try {
    const data = req.body;
    const { phoneNumber, userName, password } = data;
    // const selectSql = "select * from users where phoneNumber=?";
    // let [result] = await db.query(selectSql, data.phoneNumber)
    //     .catch(err => { console.log(err) });
    // //号码已占用
    // if (result.length > 0) {
    //     throw new Error(res.send({
    //         status: 403,
    //         message: "电话号码已注册过了嗷",
    //     }))
    // }

    // 删除users表
    const dropTableQuery = "DROP TABLE IF EXISTS users";
    const [result] = await db.query(dropTableQuery)
    console.log(result)

    const createTableQuery =
    "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY)";

    const [createTableResult] = await db.query(createTableQuery);
    // console.log(createTableResult.warningStatus)

    await addColumnIfNotExists("users", "userName", "VARCHAR(255)");
    await addColumnIfNotExists("users", "password", "VARCHAR(255)");
    await addColumnIfNotExists("users", "phoneNumber", "VARCHAR(255)");

    const ifExist = await checkIfExists("users", "phoneNumber", phoneNumber);

    if (ifExist) {
      res.send({
        status: 403,
        message: "电话号码已被注册",
      });
      return
    }

    //对密码进行加密
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);
    const insertSql = "insert into users set ?";

    const insertStr = { phoneNumber, userName, password: hashPassword };
    const [insertStrResult] = await db
      .query(insertSql, insertStr)
    if (insertStrResult.affectedRows !== 1) {
      res.send({
        status: 403,
        message: "请求失败",
      });
    }

    const tokenStr = jwt.sign(insertStr, config.jwtSecretKey, {
      expiresIn: "10h",
    });
    res.send({
      status: 0,
      message: "注册成功",
      token: tokenStr,
    });
  } catch (err) {
    console.log("regUser", err);
    res.send({
      status: 403,
      message: "请求失败",
      desc: err.message,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const data = req.body;
    const selectSql = "select * from users where phoneNumber=?";
    let [result] = await db.query(selectSql, data.phoneNumber).catch((err) => {
      console.log(err);
    });
    //无注册账号
    if (result.length == 0) {
      return res.send({
        status: 403,
        message: "无注册账号",
      });
    }

    //验证密码
    const compareResult = bcrypt.compareSync(data.password, result[0].password);
    if (compareResult == 0) {
      return res.send({
        status: 403,
        message: "密码错误",
      });
    }

    const user = { ...result[0], password: "" };
    console.log(user);
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: "10h" });
    return res.send({
      status: 0,
      message: "登录成功",
      token: tokenStr,
    });
  } catch (err) {
    return res.send({
      status: 403,
      message: "请求失败",
      desc: err.message,
    });
  }
}

export async function GetInfo(req, res) {
  // console.log(req.headers.authorization);
  const token = req.headers.authorization;
  if (!token) {
    return res.send({
      status: 403,
      message: "无token",
    });
  }
  try {
    const flag = jwt.verify(token, config.jwtSecretKey);
    if (flag) {
      return res.send({
        status: 0,
        message: "验证成功",
      });
    } else {
      return res.send({
        status: 403,
        message: "token错误",
      });
    }
  } catch (err) {
    return res.send({
      status: 403,
      message: "token已过期",
    });
  }
}
