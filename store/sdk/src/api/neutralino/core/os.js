class Api {
  constructor(base) {
    this.base = base
  }
  // win.versionEx
  async execCommand (command, options = {
    background: undefined,
    stdIn: undefined, // todo
    cwd: undefined,
  }) {
    const [err, res] = await globalThis.main.ws.call(`run`, [``, command, options])
    return res
  }
  async getEnv (key) {
    return (await this.base.native.string.getenv(key))[1]
  }
  async getEnvs () {
    const { stdOut } = await this.execCommand(`cmd /c set`)
    return stdOut.split(`\r\n`).reduce((acc, cur) => {
      let [key, ...val] = cur.split(`=`)
      acc[key] = val.join(``)
      return acc
    }, {})
  }
  async showOpenDialog (title, options = {
    defaultPath: undefined,
    filters: [],
  }) {
    const filters = (options.filters || []).map(item => `${item.name}|${item.extensions.map(item => `*.${item}`).join(`;`)}`).join(`|`)
    return (await this.base.native.fsys.dlg.open(filters, title, options.defaultPath))[1]
  }
  async showSaveDialog (title, options = {
    defaultPath: undefined,
    forceOverwrite: undefined,
    filters: [],
  }) {
    const filters = (options.filters || []).map(item => `${item.name}|${item.extensions.map(item => `*.${item}`).join(`;`)}`).join(`|`)
    return (await this.base.native.fsys.dlg[options.forceOverwrite ? `save` : `saveOp`](filters, title, options.defaultPath))[1]
  }
  async showFolderDialog (title, options = {
    defaultPath: undefined,
  }) {
    return (await this.base.native.fsys.dlg.dir(options.defaultPath, undefined, title))[1]
  }
  /**
   * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-messagebox
   */
  async showMessageBox (title, content, choice = `OK`, icon = `INFO`) {
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
  }
  /**
   * @see https://learn.microsoft.com/en-us/windows/win32/api/shlobj_core/nf-shlobj_core-shgetknownfolderpath
   */
  async getPath (name) {
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
  }
  async open (url) {
    const [err, val] = await this.base.native.process.openUrl(url)
    return val
  }
}
export default Api
