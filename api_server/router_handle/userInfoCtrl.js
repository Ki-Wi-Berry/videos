import db from "../db/user_db.js";
import { GetUserInfoFromToken } from "../utils/hook.js";

// 获取个人全部信息
async function getAllUserInfo(userId) {
  const searchSql = `SELECT * FROM users WHERE userId = ${userId}`;
  const [searchResult] = await db.query(searchSql);
  return searchResult[0];
}

// 获取用户详细信息
export async function getUserInfoDetail(req, res) {
  const userInfo = GetUserInfoFromToken(req);
  if (!userInfo) {
    return res.send({
      status: 403,
      message: "登陆状态过期",
    });
  }
  const { userId, userName, phoneNumber, userAge, userImgUrl } =
    await getAllUserInfo(userInfo.userId);
  res.send({
    status: 200,
    data: { userId, userName, phoneNumber, userAge, userImgUrl },
  });
}

// 获取顶栏用户信息
export async function getHeaderUserInfo(req, res) {
  const userInfo = GetUserInfoFromToken(req);
  if (!userInfo) {
    return res.send({
      status: 403,
      message: "登陆状态过期",
    });
  }
  const { userId, userName, userImgUrl,followNumber,fanNumber } =
    await getAllUserInfo(userInfo.userId);
  res.send({
    status: 200,
    data: { userId, userName, userImgUrl,followNumber,fanNumber },
  })
}

// 修改用户信息
export async function changeUserInfoDetail(req, res) {
  const userInfo = GetUserInfoFromToken(req);
  const { userName,userAge, userImgUrl,userId } = req.body;
  if (!userInfo || userInfo.userId !== userId) {
    return res.send({
      status: 403,
      message: "请重新登陆",
    });
  }
  // console.log(req.body)
  const updateUserInfoSql = `UPDATE users SET userName = ?, userAge = ?, userImgUrl = ? WHERE userId = ${userId}`;
  const [updateUserInfoResult] = await db.query(updateUserInfoSql, [
    userName,userAge, userImgUrl
  ])
  console.log(updateUserInfoResult)
  if (updateUserInfoResult.affectedRows === 1) {
    res.send({
      status: 200,
      message: "修改成功",
    });
  }
}

// 获取我的视频
export async function getUserMovies(req, res){
  const userInfo = GetUserInfoFromToken(req);
  if (!userInfo) {
    return res.send({
      status: 403,
      message: "请重新登陆",
    });
  }
  const searchSql = `SELECT * FROM movies WHERE userId = ${userInfo.userId}`;
  const [searchResult] = await db.query(searchSql);
  console.log(searchResult)
  res.send({
    status: 200,
    data: {movieList:searchResult}
  })
}