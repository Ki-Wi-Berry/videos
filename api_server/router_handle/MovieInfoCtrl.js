import db from "../db/user_db.js";
import { getAllUserInfo } from "./userInfoCtrl.js";
import { GetUserInfoFromToken,addSome } from "../utils/hook.js";

// 获取视频相关数据
export async function getMovieData(movieId) {
  const searchSql = `SELECT * FROM movies WHERE movieId = ${movieId}`;
  const [searchResult] = await db.query(searchSql);
  // console.log(searchResult)
  if (searchResult.length == 0) {
    return res.send({
      status: 403,
      message: "该视频不存在",
    });
  }
  return searchResult[0];
}

// 获取视频播放页顶栏数据
export async function getMoviePageHeaderInfo(req, res) {
  const { movieId } = req.query;
  const { movieName, userId, updateTime, viewNumber, barrageNumber } =
    await getMovieData(movieId);
  const { userName, description, fanNumber, userImgUrl } = await getAllUserInfo(
    userId
  );
  res.send({
    status: 200,
    data: {
      movieName,
      updateTime: updateTime * 1000,
      viewNumber,
      userName,
      description,
      fanNumber,
      userImgUrl,
      barrageNumber,
    },
  });
}

// 增加视频阅览量
export async function addMovieViews(req, res) {
  const { movieId } = req.body;
  const { viewNumber } = await getMovieData(movieId);

//   const updateSql = "UPDATE movies SET viewNumber = ? WHERE movieId = ?"; 
  const updateStrResult = await addSome('movies','viewNumber',viewNumber+1,'movieId',movieId);
//   console.log(updateStrResult,viewNumber)
  if(!updateStrResult){
    return res.send({
      status: 403,
      message: "更新失败",
    });
  }
  res.send({
    status: 200,
    message: "更新成功",
  })
}

// 获取视频播放页视频数据
export async function getMovieInfo(req, res) {
  const { movieId } = req.query;
//   console.log(movieId)
  const { movieUrl, imgUrl } = await getMovieData(movieId);
  res.send({
    status: 200,
    data: { movieUrl, imgUrl },
  });
}

// 用户输入弹幕
export async function addBarrage(req, res) {
  //   const userInfo = GetUserInfoFromToken(req);
  //   if (!userInfo) {
  //     return res.send({
  //       status: 403,
  //       message: "登陆状态过期",
  //     });
  //   }
  const { movieTime, movieId, content } = req.body;
  const insertSql = "insert into barrages set ?";
  const insertStr = { movieId, movieTime, content };
  const [insertStrResult] = await db.query(insertSql, insertStr);
  // console.log(insertStrResult.affectedRows);
  if (insertStrResult.affectedRows !== 1) {
    res.send({
      status: 403,
      message: "更新失败",
    });
  }
  const { barrageNumber } =
    await getMovieData(movieId);
  const updateStrResult = await addSome('movies','barrageNumber',barrageNumber+1,'movieId',movieId);
  if(!updateStrResult){
    return res.send({
      status: 403,
      message: "更新失败",
    });
  }
  res.send({
    status: 200,
    message: "更新成功",
  });
}

// 获取弹幕
export async function getBarrage(req, res) {
  const { movieTime, movieId } = req.query;
  // console.log(req)
  // console.log(movieTime, movieId)
  const searchSql = `SELECT * FROM barrages WHERE movieId = ${movieId} AND movieTime = ${movieTime}`;
  const [searchResult] = await db.query(searchSql);
  // console.log(searchResult)
  const barrageList = searchResult.map((item) => item.content);
  res.send({
    status: 200,
    data: { barrageList },
  });
}
