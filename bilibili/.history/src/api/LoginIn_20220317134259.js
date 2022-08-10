import axios from "../utils/request"

export const LoginInPost = (data) => {
    return axios({
        url: "/api/xxxx",
        method: "post",
        data,
        config: {
        }
    })
}