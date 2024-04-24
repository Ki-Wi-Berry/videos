import easyUploaderServer from "easy-file-uploader-server";
import path from "path";
import fs from "fs";
import child_process from "child_process";
import db from "../db/user_db.js";
import { checkIfExists, GetUserInfoFromToken } from "../utils/hook.js";
const { exec } = child_process;

const { FileUploaderServer } = easyUploaderServer;

const __dirname = path.resolve();

console.log(path.join(__dirname, "public/tempUploadFile"));

const fileUploader = new FileUploaderServer({
  tempFileLocation: path.join(__dirname, "public/tempUploadFile"),
  mergedFileLocation: path.join(__dirname, "public/mergedUploadFile"),
});

export async function initUpload(req, res) {
  const { name } = req.body;
  const uploadId = await fileUploader.initFilePartUpload(name);
  return res.send({
    status: 200,
    data:{
      uploadId,
    }
  });
  //   res.status(200);
  //   res.json({ uploadId });
}

export async function uploadPart(req, res) {
  const { buffer } = req.file;
  const { uploadId, partIndex } = req.body;
  const partFileMd5 = await fileUploader.uploadPartFile(
    uploadId,
    partIndex,
    buffer
  );
  return res.send({
    status: 200,
    partFileMd5,
  });
  //   res.status(200);
  //   res.json({ partFileMd5 });
}

// 将视频格式转换成ts格式
export function VideoToTs(input, output) {
  return new Promise((res, rej) => {
    // 定义转换视频的命令
    const command = `ffmpeg -y -i ${input} -vcodec copy -acodec copy -vbsf h264_mp4toannexb ${output}`;
    exec(command, (err) => {
      // 执行命令
      if (err) {
        rej(err);
      }
      res();
    });
  });
}

// 视频切片方法
export async function sliceVideoFromFFmpeg(inputPath) {
  // 将视频路径使用path.sep进行分割成数组，path.sep兼容window和linux的路径分隔符
  const pathlist = inputPath.split(path.sep);
  // 获取视频路径目录
  const pathDir = pathlist.slice(0, pathlist.length - 1).join(path.sep);
  // 获取视频名字
  const tempName = pathlist.at(-1).slice(0, pathlist.at(-1).lastIndexOf("."));

  // 转换成ts格式的视频文件路径
  const outputPath = path.resolve(`${pathDir}/${tempName}.ts`);
  // 生成视频的索引文件路径
  const m3u8Path = path.resolve(`${pathDir}/chunk/index.m3u8`);
  // 视频切片后每个切片的文件路径
  const videoPath = path.resolve(`${pathDir}/chunk/${tempName}-%04d.ts`);
  // 切片命令
  const command = `ffmpeg -i ${outputPath} -c copy -map 0 -f segment -segment_list ${m3u8Path} -segment_time 10 ${videoPath}`;
  // 先执行转换格式的方法
  await VideoToTs(inputPath, outputPath);
  // 创建切片和索引文件存放的目录
  fs.mkdir(path.join(`${pathDir}`, "chunk"), (err) => {
    if (err) {
      console.log(err);
    }
    // 执行切片命令
    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(err);
      }
    });
  });
  return m3u8Path;
}

export async function finishUpload(req, res) {
  const { uploadId, name, md5, uploadingFileType } = req.body;
  const { path: filePathOnServer } = await fileUploader.finishFilePartUpload(
    uploadId,
    name,
    md5
  );

  let suffix;

  if (uploadingFileType === "movie") {
    suffix = await sliceVideoFromFFmpeg(filePathOnServer);
  } else if (uploadingFileType === "img") {
    suffix = filePathOnServer;
  }

  // 返回分片后生成的m3u8索引地址
  let m3u8Path = suffix.split("public")[1].replaceAll("\\", "/").slice(1);
  //   console.log("filePathOnServer", filePathOnServer);
  //   console.log("suffix", suffix);
  return res.send({
    status: 200,
    data: {
      path: m3u8Path,
    },
  });
  //   res.status(200);
  //   res.json({ path: m3u8Path });
}

export async function confirmUpload(req, res) {
  const userInfo = GetUserInfoFromToken(req);
  if (!userInfo) {
    return res.send({
      status: 403,
      message: "登陆状态过期",
    });
  }

  const date = new Date();

  const updateTime = Date.parse(date)/1000;

  const userId = userInfo.userId;
  const author = userInfo.userName;
  //   console.log(userId)
  const { movieUrl, imgUrl, movieName } = req.body;
  //   console.log(movieUrl,imgUrl,movieName,id)
  const insertSql = "insert into movies set ?";

  const insertStr = { movieUrl, imgUrl, movieName, userId, author,updateTime,viewNumber:0,likesNumber:0,barrageNumber:0 };

  const [insertStrResult] = await db.query(insertSql, insertStr);
  // console.log(insertStrResult.affectedRows);
  if (insertStrResult.affectedRows !== 1) {
    res.send({
      status: 403,
      message: "上传失败",
    });
  } else {
    res.send({
      status: 200,
      message: "上传成功",
    });
  }
}
