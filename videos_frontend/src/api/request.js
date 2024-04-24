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

// 获取用户详细信息
export const getUserInfoDetail = (data) => {
    return axios({
        url: "http://localhost:3007/api/getUserInfoDetail",
        method: "get",
        data
    })
}

// 获取顶栏所需个人信息
export const getHeaderUserInfo = (data) => {
    return axios({
        url: "http://localhost:3007/api/getHeaderUserInfo",
        method: "get",
        data
    })
}

// 修改用户详细信息
export const changeUserInfoDetail = (data) => {
    return axios({
        url: "http://localhost:3007/api/changeUserInfoDetail",
        method: "post",
        data
    })
}

// 获取我的视频
export const getUserMovies = (data) => {
    return axios({
        url: "http://localhost:3007/api/getUserMovies",
        method: "get",
        data
    })
}

// 获取视频播放页顶栏信息
export const getMoviePageHeaderInfo = (data) => {
    return axios({
        url: "http://localhost:3007/api/getMoviePageHeaderInfo",
        method: "get",
        data
    })
}

// 获取视频播放页视频信息
export const getMovieInfo = (data) => {
    return axios({
        url: "http://localhost:3007/api/getMovieInfo",
        method: "get",
        data
    })
}

// 视频阅览量增加 1
export const addMovieViews = (data) => {
    return axios({
        url: "http://localhost:3007/api/addMovieViews",
        method: "post",
        data
    })
}

// 添加弹幕
export const addBarrage = (data) => {
    return axios({
        url: "http://localhost:3007/api/addBarrage",
        method: "post",
        data
    })
}

// 获取弹幕
export const getBarrage = (data) => {
    return axios({
        url: "http://localhost:3007/api/getBarrage",
        method: "get",
        data
    })
}


// 获取搜索页视频数据
export const getSearchMovieList = (data) => {
    return axios({
        url: "http://localhost:3007/api/getSearchMovieList",
        method: "get",
        data
    })
}

// 获取首页视频数据
export const getHomeMovieList = (data) => {
    return axios({
        url: "http://localhost:3007/api/getHomeMovieList",
        method: "get",
        data
    })
}