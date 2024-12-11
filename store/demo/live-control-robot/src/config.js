import DisableDevtool from 'disable-devtool'
if (process.env.NODE_ENV !== `development`) {
  // DisableDevtool({
  //   timeOutUrl: `https://example.com/`,
  //   disableMenu: false,
  //   ondevtoolopen(type, next) {
  //     console.log(`Devtool opened with type:` + type)
  //     next()
  //   },
  // })
}

export default {
  development: {
    baseApi: `http://127.0.0.1:7800/`,
    sysShimWs: import.meta.env.VITE_SERVER_BASEURL || undefined,
    page: `http://127.0.0.1:5173/init.html`,
  },
  production: {
    baseApi: `http://162.14.76.148:7800/`,
    page: `http://162.14.76.148:7800/live/init.html`,
    sysShimWs: undefined,
  },
}[process.env.NODE_ENV || `production`]

console.log(`process.env.NODE_ENV`, process.env.NODE_ENV)
