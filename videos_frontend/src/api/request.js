import { axios } from "../utils/request"

export const LoginInPost = (data) => {
    return axios({
        url: "http://localhost:3007/api/user_login",
        method: "post",
        data
    })
}

export const RegUser = (data) => {
    return axios({
        url: "http://localhost:3007/api/user_register",
        method: "post",
        data
    })
}

export const GetUsersInfo = (data) => {
    return axios({
        url: "http://localhost:3007/api/get_info",
        method: "get",
        data
    })
}

export const GetMovie = (data) =>{
    return axios({
        url: "http://localhost:3001/video3",
        method: "get",
        data
    })
}

