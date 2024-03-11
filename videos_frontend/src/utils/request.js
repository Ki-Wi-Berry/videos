// http/axios.js
import instance from "./index"
/**
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @param {Object} config  请求的配置
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */

const localhost = ''

export const axios = ({
    method,
    url,
    data,
    config
}) => {
    method = method.toLowerCase();
    const queryUrl = `${localhost}${url}`
    if (method == 'post') {
        return instance.post(queryUrl, data, {...config})
    } else if (method == 'get') {
        return instance.get(queryUrl, {
            params: data,
            ...config
        })
    } else if (method == 'delete') {
        return instance.delete(queryUrl, {
            params: data,
            ...config
        }, )
    } else if (method == 'put') {
        return instance.put(queryUrl, data,{...config})
    } else {
        console.error('未知的method' + method)
    }
}
