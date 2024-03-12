async function init() {
  console.log(`this`, this)
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
    return new Promise(async (resolve) => {
      await init.apply(this)
      resolve(this)
    })
  }
  app = {
    exit: async (exitCode) => {
      this.app.killProcess()
    },
    killProcess: async () => {
      this.base.native.G.killAll()
    },
    restartProcess: async () => {
      console.warn(`// todo`)
    },
    getConfig: async () => {
      return (await this.base.native.G)[1].config
    },
    broadcast: async (eventName, ...arg) => {
      return await this.base.native.G.rpcServer.publish(eventName, ...arg)
    },
    readProcessInput: async (readAll) => {
      console.warn(`// todo`)
    },
    writeProcessOutput: async (data) => {
      console.warn(`// todo`)
    },
    writeProcessError: async (data) => {
      console.warn(`// todo`)
    },
  }
  clipboard = {
  }
  os = {
    // win.versionEx
    execCommand: async (command, options = {
      background: undefined,
      stdIn: undefined, // todo
      cwd: undefined,
    }) => {
      const [err, res] = await main.ws.call(`run`, [`
        var cmd, options = ...
        console.log(11)
        var back = process.workDir
        if(options.cwd) {
          process.workDir = options.cwd
        }
        var proc = process.popen(cmd)
        process.workDir = back
        if(options.background) {
          return {
            stdOut = '',
            stdErr = '',
            pid = proc.process.id,
            exitCode = -1,
            proc = proc,
          }
        } else {
          return {
            stdOut = proc.read(-1),
            stdErr = proc.readErr(-1),
            pid = proc.process.id,
            exitCode = proc.getExitCode(),
            proc = proc,
          }
        }
      `, command, options])
      return res
    },
    getEnv: async (key) => {
      return (await this.base.native.string.getenv(key))[1]
    },
    getEnvs: async () => {
      const { stdOut } = await this.os.execCommand(`cmd /c set`)
      return stdOut.split(`\r\n`).reduce((acc, cur) => {
        let [key, ...val] = cur.split(`=`)
        acc[key] = val.join(``)
        return acc
      }, {})
    },
    showOpenDialog: async (title, options = {
      defaultPath: undefined,
      filters: []
    }) => {
      const filters = (options.filters || []).map(item => `${item.name}|${item.extensions.map(item => `*.${item}`).join(`;`)}`).join(`|`)
      return (await this.base.native.fsys.dlg.open(filters, title, options.defaultPath))[1];
    },
    showSaveDialog: async (title, options = {
      defaultPath: undefined,
      forceOverwrite: undefined,
      filters: []
    }) => {
      const filters = (options.filters || []).map(item => `${item.name}|${item.extensions.map(item => `*.${item}`).join(`;`)}`).join(`|`)
      return (await this.base.native.fsys.dlg[options.forceOverwrite ? `save` : `saveOp`](filters, title, options.defaultPath))[1];
    },
    showFolderDialog: async (title, options = {
      defaultPath: undefined,
    }) => {
      return (await this.base.native.fsys.dlg.dir(options.defaultPath, undefined, title))[1];
    },
  }
  computer = {
    getOSInfo: async () => {
      // todo
      // aar win.versionEx
      return {
        "description": "Microsoft Windows 10 专业版",
        "name": "Windows NT",
        "version": "10.0.19045-4046"
      }
    }
  }
}
export default Api
