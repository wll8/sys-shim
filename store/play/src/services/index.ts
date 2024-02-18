import { BASE_URL, TIME_OUT } from './config'
import Request from './request'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
})
export default request
