import express from "express";
import cors from "cors";
import path from "path";
import useRouter from "./router/router.js";
import bodyparser from "body-parser";
import config from "./config.js";
import expressJWT from "express-jwt";

const __dirname = path.resolve();

const app = express();
app.use(cors());
// 解析表单中间件
app.use(express.urlencoded({ extended: true }));
app.use(bodyparser.json());

// app.use(expressJWT({secret:config.jwtSecretKey}))



app.use("/api", useRouter);

app.use((req, res, next) => {
  // if(err.name=='UnauthorizedError') return res.send({
  //     status:403,
  //     message:"身份认证失败"
  // })
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  next();
});



app.use(
  "/mergedUploadFile",
  express.static(path.join(__dirname, "./public/mergedUploadFile"))
);

app.listen(3007, () => {
  console.log("http://127.0.0.1:3007");
});
