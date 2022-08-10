import {axios} from "../utils/request"

export const LoginInPost = (data) => {
    return axios({
        url: "http://localhost:3007/api/user",
        method: "post",
        data,
        config: {
        }
    })
}