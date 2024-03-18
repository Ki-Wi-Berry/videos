import { axios } from "../utils/request"

// 登陆
export const LoginInPost = (data) => {
    return axios({
        url: "http://localhost:3007/api/user_login",
        method: "post",
        data
    })
}

// 注册
export const RegUser = (data) => {
    return axios({
        url: "http://localhost:3007/api/user_register",
        method: "post",
        data
    })
}


// 用户信息
export const GetUsersInfo = (data) => {
    return axios({
        url: "http://localhost:3007/api/get_info",
        method: "get",
        data
    })
}

// 视频播放信息
export const GetMovie = (data) =>{
    return axios({
        url: "http://localhost:3001/video3",
        method: "get",
        data
    })
}

// 上传视频初始化
export const InitUpload = (data,config)=>{
    return axios({
        url: "http://localhost:3007/api/initUpload",
        method: "post",
        data,
        config
    })
}

// 上传视频分片
export const UploadPart = (data,config)=>{
    console.log(data,config)
    return axios({
        url: "http://localhost:3007/api/uploadPart",
        method: "post",
        data,
        config
    })
}

// 上传视频完成
export const FinishUpload = (data,config)=>{
    return axios({
        url: "http://localhost:3007/api/FinishUpload",
        method: "post",
        data,
        config
    })
}

// 确认上传
export const confirmUpload = (data,config)=>{
    return axios({
        url: "http://localhost:3007/api/confirmUpload",
        method: "post",
        data,
        config
    })
}

