import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestConfig, RequestConstructorConfig } from './type'

class Request {
  instance: AxiosInstance
  constructor(config: RequestConstructorConfig = {}) {
    this.instance = axios.create(config)
    // 请求拦截
    // this.instance.interceptors.request.use(
    //   (config) => {
    //     // console.log('全局请求拦截成功')
    //     return config
    //   },
    //   (err) => {
    //     // console.log('全局请求拦截失败')
    //     return err
    //   }
    // )
    // 响应拦截
    // this.instance.interceptors.response.use(
    //   (config) => {
    //     return config.data
    //   },
    //   (err) => {
    //     return err
    //   }
    // )
    // 单独请求拦截
    this.instance.interceptors.request.use(
      config?.interceptors?.requestSuccessFn,
      config?.interceptors?.requestErrFn,
    )
    // 单独响应拦截
    this.instance.interceptors.response.use(
      config?.interceptors?.responseSuccessFn,
      config?.interceptors?.responseErrFn,
    )
  }

  request<T = any>(config: RequestConfig<T>) {
    // 实现单独请求拦截
    if (config?.interceptors?.requestSuccessFn)
      config = config.interceptors.requestSuccessFn(config)

    return new Promise<T>((reslove) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config?.interceptors?.responseSuccessFn)
            res = config?.interceptors?.responseSuccessFn(res)

          reslove(res)
        })
        .catch((err: string) => {
          console.error('请求出错: ', err)
        })
    })
  }

  get<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: RequestConfig<T>) {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
export default Request
