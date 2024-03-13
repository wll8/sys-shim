import Clipboard from "@/api/neutralino/core/clipboard.js"
import Filesystem from "@/api/neutralino/core/filesystem.js"


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
    /**
     * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messagebox
     */
    showMessageBox: async (title, content, choice = `OK`, icon = `INFO`) => {
      const map = {
        choice: {
          OK: 0x00000000,
          OK_CANCEL: 0x00000001,
          YES_NO: 0x00000004,
          YES_NO_CANCEL: 0x00000003,
          RETRY_CANCEL: 0x00000005,
          ABORT_RETRY_IGNORE: 0x00000002,
        },
        icon: {
          INFO: 0x00000040,
          WARNING: 0x00000030,
          ERROR: 0x00000010,
          QUESTION: 0x00000020,
        },
        // 返回值
        value: {
          ABORT: 3,
          CANCEL: 2,
          CONTINUE: 11,
          IGNORE: 5,
          NO: 7,
          OK: 1,
          RETRY: 4,
          TRYAGAIN: 10,
          YES: 6,
        },
      }
      // 返回 number
      const val = (await this.base.native.win.msgbox(content, title, map.choice[choice] | map.icon[icon] ))[1]
      // 根据 number 获取 key
      const key = Object.entries(map.value).find(([, v]) => v === val)[0]
      return key
    },
    /**
     * @see https://learn.microsoft.com/en-us/windows/win32/api/shlobj_core/nf-shlobj_core-shgetknownfolderpath
     */
    getPath: async (name) => {
      const map = {
        name: {
          config: `3EB685DB-65F9-4CF6-A03A-E3EF65729F3D`,
          data: `3EB685DB-65F9-4CF6-A03A-E3EF65729F3D`,
          cache: `F1B32785-6FBA-4FCF-9D55-7B8E7F157091`,
          documents: `FDD39AD0-238F-46AF-ADB4-6C85480369C7`,
          pictures: `33E28130-4E1E-4676-835A-98395C3BC3BB`,
          music: `4BD8D571-6D19-48D3-BE97-422220080E43`,
          video: `18989B1D-99B5-455B-841C-AB7C74E4DDFC`,
          downloads: `374DE290-123F-4565-9164-39C4925E467B`,
          savedGames1: `4C5C32FF-BB9D-43b0-B5B4-2D72E54EAAA4`,
          savedGames2: `4C5C32FF-BB9D-43b0-B5B4-2D72E54EAAA4`,
        },
      }
      const [err, val] = await this.base.native.fsys.knownFolder(map.name[name])
      return val
    },
    open: async (url) => {
      const [err, val] = await this.base.native.process.openUrl(url)
      return val
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
