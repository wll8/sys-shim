import config from '@/config.js'
import * as util from '@/util.js'
import axios from 'axios'

const http = axios.create({
  timeout: 1000 * 30, // 请求超时
  baseURL: config.baseApi,
})

// request拦截器
http.interceptors.request.use(
  (options) => {
    return options
  },
  (error) => {
    Promise.reject(error)
  },
)
// response拦截器
http.interceptors.response.use(
  (response) => {
    const data = response.data
    if ([`2`, `3`].includes(String(data.code || response.status)[0])) {
      if (util.isType(data, `blob`)) {
        return response
      } else if (data.data === undefined) {
        return data
      } else {
        return response.data.data
      }
    } else {
      return Promise.reject(data.msg || data)
    }
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default http
