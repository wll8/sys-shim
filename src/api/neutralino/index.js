import Clipboard from "@/api/neutralino/core/clipboard.js"
import Filesystem from "@/api/neutralino/core/filesystem.js"
import Os from "@/api/neutralino/core/os.js"
import Computer from "@/api/neutralino/core/computer.js"
import App from "@/api/neutralino/core/app.js"
import Events from "@/api/neutralino/core/events.js"

async function init() {
  Object.assign(globalThis, {
    NL_OS: `Windows`,
    NL_ARCH: `// tdo`, // 报错
    NL_APPID: `// todo`, // "js.neutralino.sample"
    NL_APPVERSION: `NL_APPVERSION`, // "1.0.0"
    NL_PORT: (await this.app.getConfig()).socket.port, // 7380
    NL_MODE: `// todo`, // "window"
    NL_VERSION: await (async () => {
      const [, res] = await this.base.ws.call(`run`, [`return fsys.version.getInfo( io._exepath )`])
      return [
        res.productVersion.build, // 主版本号
        res.productVersion.major, // 副版本号
        res.productVersion.minor, // 编译版本或补丁版本
        res.productVersion.revision, // 内部修订版本号
      ].join(`.`)
    })(),
    NL_CVERSION: `// todo`, // "3.12.0"
    NL_CWD: (await this.base.native.fsys.getCurDir())[1], // "D:/git2/neutralinojs-demo"
    NL_PATH: (await this.base.native.io.fullpath(`~`))[1], // "."
    NL_ARGS: await (async () => {
      const [, res] = await this.base.ws.call(`run`, [`return table.concat({io._exepath}, _ARGV)`])
      return res
    })(),
    NL_PID: (await this.base.native.process.getId())[1], // 30944
    NL_RESMODE: `directory`, // "directory"
    // 是否开启了插件功能
    NL_EXTENABLED: true, // false
    NL_COMMIT: `// todo`, // "c2bc634f22cf467b63dbdec3e61bfef9924e0bef"
    NL_CCOMMIT: `// todo`, // "043cc4f11ec6c545b8c747bddf3370871bd7b96a"
    // 自行添加的方法列表
    NL_CMETHODS: `// todo`, // []
    // 启动程序时是否有配置文件
    NL_WSAVSTLOADED: `// todo`, // true
  })
}

class Api {
  constructor(base) {
    this.base = base

    this.clipboard = new Clipboard(base)
    this.filesystem = new Filesystem(base)
    this.os = new Os(base)
    this.computer = new Computer(base)
    this.app = new App(base)
    this.events = new Events(base)

    return new Promise(async (resolve) => {
      await init.apply(this)
      resolve(this)
    })
  }
}
export default Api
