import db from "../db/user_db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../config.js";
import {
  checkIfExists,
  GetUserInfoFromToken,
} from "../utils/hook.js";

// 注册
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
    // const dropTableQuery = "DROP TABLE IF EXISTS users";
    // const [result] = await db.query(dropTableQuery)
    // console.log(result);

    // const createUserTable =
    //   "CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY)";

    // const [createTableResult] = await db.query(createUserTable);
    // console.log(createTableResult.warningStatus)

    // await addColumnIfNotExists("users", "userName", "VARCHAR(255)");
    // await addColumnIfNotExists("users", "password", "VARCHAR(255)");
    // await addColumnIfNotExists("users", "phoneNumber", "VARCHAR(255)");

    const ifExist = await checkIfExists("users", "phoneNumber", phoneNumber);

    if (ifExist) {
      res.send({
        status: 403,
        message: "电话号码已被注册",
      });
      return;
    }

    //对密码进行加密
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log(hashPassword);
    const insertSql = "insert into users set ?";

    const insertStr = { phoneNumber, userName, password: hashPassword };
    const [insertStrResult] = await db.query(insertSql, insertStr);
    if (insertStrResult.affectedRows !== 1) {
      res.send({
        status: 403,
        message: "请求失败",
      });
    }

    const tokenStr = jwt.sign({ insertStr }, config.jwtSecretKey, {
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

// 登陆
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

    const user = { ...result[0] };
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

// 获取用户信息
export async function GetUserInfo(req, res) {
  // console.log(req.headers.authorization);
  const userInfo = GetUserInfoFromToken(req);
  if (!userInfo) {
    return res.send({
      status: 403,
      message: "登陆状态过期",
    });
  } else {
    return res.send({
      status: 0,
      message: "验证成功",
    });
  }
  // const token = req.headers.authorization;
  // if (!token) {
  //   return res.send({
  //     status: 403,
  //     message: "无token",
  //   });
  // }
  // try {
  //   const userInfo = jwt.verify(token, config.jwtSecretKey);
  //   console.log(userInfo);
  //   if (userInfo) {
  //     return res.send({
  //       status: 0,
  //       message: "验证成功",
  //     });
  //   } else {
  //     return res.send({
  //       status: 403,
  //       message: "token错误",
  //     });
  //   }
  // } catch (err) {
  //   return res.send({
  //     status: 403,
  //     message: "token已过期",
  //   });
  // }
}
