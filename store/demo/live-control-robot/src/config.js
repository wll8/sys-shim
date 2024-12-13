export default {
  development: {
    baseApi: `http://127.0.0.1:7800/`,
    sysShimWs: import.meta.env.VITE_SERVER_BASEURL || undefined,
  },
  production: {
    baseApi: `http://127.0.0.1:7800/`,
    sysShimWs: undefined,
  },
}[process.env.NODE_ENV || `production`]

console.log(`process.env.NODE_ENV`, process.env.NODE_ENV)
