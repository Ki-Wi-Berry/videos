import { axios } from "../utils/request"

export const LoginInPost = (data) => {
    return axios({
        url: "http://localhost:3007/api/user_login",
        method: "post",
        data
    })
}

export const GetUsersInfo = () => {
    return axios({
        url: "http://localhost:3007/api/get_info",
        method: "get",
    })
}