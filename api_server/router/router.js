import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { regUser, loginUser, GetUserInfo } from "../router_handle/LoginCtrl.js";
import {
  initUpload,
  uploadPart,
  finishUpload,
  confirmUpload
} from "../router_handle/UploadCtrl.js";

const router = new express.Router();
const upload = multer();
const __dirname = path.resolve();

// const urlencodedParser = bodyParser.urlencoded({ extended: false })

//注册新用户
router.post("/user_register", regUser);

// 登录
router.post("/user_login", loginUser);

// 获取用户信息
router.get("/get_info", GetUserInfo);

router.get("/demo2", (req, res) => {
  console.log(111);
  try {
    let videoPath = path.resolve(__dirname, "assets/01.mp4");
    // let videoPath = "../assets/01.mp4";

    let readStream = fs.createReadStream(videoPath);

    readStream.pipe(res);
    console.log("传输成功");
  } catch (err) {
    console.log(err);
  }
});

router.get("/video3", async (req, res) => {
  let plist = await getAllVideoIdxPath();
  res.status(200);
  res.json({
    plist,
  });
});

/**
 * 读取mergedUploadFile目录下的所有视频索引文件
 * 返回这些索引文件路径的数组
 */
function getAllVideoIdxPath() {
  return new Promise((res, rej) => {
    let vpath = path.resolve(__dirname, "public/mergedUploadFile");
    fs.readdir(vpath, (err, files) => {
      if (err) {
        rej(err);
      }
      let plist = files.map((item) => {
        return `mergedUploadFile/${item}/chunk/index.m3u8`;
      });
      res(plist);
    });
  });
}

// 上传初始化接口
router.post("/initUpload", initUpload);

// 接收分片
router.post("/uploadPart", upload.single("partFile"), uploadPart);

// 合并分片
router.post("/finishUpload", finishUpload);

// 确认上传
router.post("/confirmUpload", confirmUpload);

export default router;
