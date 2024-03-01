import { axios } from "../utils/request"

export const LoginInPost = (data) => {
    return axios({
        url: "/api/user_login",
        method: "post",
        data
    })
}

export const RegUser = (data) => {
    return axios({
        url: "/api/user_register",
        method: "post",
        data
    })
}

export const GetUsersInfo = (data) => {
    return axios({
        url: "/api/get_info",
        method: "get",
        data
    })
}

