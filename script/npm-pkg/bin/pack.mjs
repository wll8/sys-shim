import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'
import os from 'node:os'
import filenamify from 'filenamify'
import download from 'download'
import shelljs from 'shelljs'
import {
  simpleTemplate,
} from '../../../src/util.js'
import process from 'node:process'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const pkgDir = path.join(__dirname, `../../../`)

function determinePathType(filePath) {
  if((/^(http:\/\/|https:\/\/).+/i).test(filePath)) {
    return `url`
  } else if (path.isAbsolute(filePath)) {
    return `abs`
  } else if (filePath.startsWith(`./`) || filePath.startsWith(`../`)) {
    return `relative`
  } else {
    return `sys`
  }
}


/**
 * 获取默认配置
 */
async function parseArgv(argv) {
  const cfg = {
    input: ``,
    icon: ``,
    out: ``,
    unzip: ``,
    password: ``,
    ...argv,
  }
  if(determinePathType(argv.input) === `url`) {
    cfg.icon = cfg.icon || await getIcon(`${cfg.input}/favicon.ico`)
    cfg.out = cfg.out || filenamify(cfg.input)
  } else {
    cfg.icon = cfg.icon || await getIcon(`${cfg.input}/favicon.ico`)
    cfg.out = cfg.out || path.parse(cfg.input).name
  }
  cfg.unzip = argv.unzip || `sys-shim-app/${cfg.out}`
  return cfg
}

/**
 * 如果不存在 icon 则返回默认 icon
 */
async function getIcon(iconPath) {
  if(fs.existsSync(iconPath)) {
    return iconPath
  } else {
    let icon = iconPath
    try {
      if(determinePathType(iconPath) === `url`) {
        const res = new url.URL(iconPath)
        icon = `${res.protocol}//${res.host}/favicon.ico`
        const tempIcon = `${os.tmpdir()}/${filenamify(icon)}`
        fs.writeFileSync(tempIcon, await download(icon))
        if(fs.readFileSync(tempIcon, `utf8`).match(/<html[\s\S]*<\/html/i)) {
          throw new Error(`非图片文件`)
        } else {
          return tempIcon
        }
      } else if(fs.existsSync(iconPath) === false) {
        throw new Error(`文件不存在`)
      }
    } catch (error) {
      console.warn(`从 ${icon} 获取图标错误：`)
      console.warn(String(error))
      console.warn(`将使用默认图标`)
      return `${pkgDir}/script/npm-pkg/shim/win/favicon.ico`
    }
  }
}

function zip(cfg) {
  const zipBin = `${pkgDir}/script/npm-pkg/lib/WinRAR.exe`
  const icon = cfg.icon
  const out = cfg.out
  const input = cfg.input
  const unzip = cfg.unzip

  /**
   * Path 解压后运行
   * Silent 解压对话框 1 隐藏 2 显示
   * Overwrite 解压覆盖询问 0 询问 1 覆盖 2 跳过
   * Update 更新 U 解压不存在的或较新的 F 只更新目标位置已存在的
   * Shortcut 创建快捷方式
   *  D 桌面创建
   *  P 在开始菜单/程序中创建
   *  T 在启动菜单中创建
   */
  const comment = (() => {
    const file = `${os.tmpdir()}/comment.txt`
    const text = `
      Path=${path.normalize(unzip)}
      Setup=main
      Silent=1
      Overwrite=1
      Update=U
      Shortcut=D, main, , "sys-shim app", "${cfg.out}", favicon.ico
    `.split(`\n`).map(item => item.trim()).join(`\n`).trim()
    fs.writeFileSync(file, text)
    return file
  })()

  /**
   * a 添加压缩
   * -r 递归
   * -ep1 从名称中排除主文件夹
   * -inul 关闭错误信息
   * -y 假设全部的询问回应皆为“是”
   * -sfx 创建自解压文件 默认为 Default.SFX 模块，修改示例 -sfxWinCon.SFX
   * -iicon 指定自解压图标
   * -iimg 指定自解压图片
   * -m 设置压缩等级，-m0 为存储，-m5 为最优，默认 -m3 标准
   * -p 使用密码，例如 -pMyPassWord
   * -hp 使用密码，并加密文件名
   * -z 从文件中读取注释
   * -ibck 在后台运行 WinRAR
   * -idv 显示详细输出
   */
  const outV = `${out}-${Date.now()}`
  const cmd = `${zipBin} a -r -ep1 -y -ibck -sfx -iicon"${icon}" -z"${comment}" "${outV}" ${input}/*`
  cp.execSync(cmd, {stdio: `inherit`})
}

function getIndex(cfg) {
  if(determinePathType(cfg.input) === `url`) {
    return cfg.input
  } else {
    const indexFile = `index.html`
    return fs.existsSync(`${cfg.input}/${indexFile}`) ? indexFile : `page.html`
  }
}

function genFile(cfg) {
  const newCfg = {
    input: `${os.tmpdir()}/pack.temp`,
    icon: `${os.tmpdir()}/pack.temp/favicon.ico`,
  }
  shelljs.rm(`-fr`, newCfg.input)
  shelljs.mkdir(`-p`, newCfg.input)
  shelljs.cp(`-fr`, `${pkgDir}/template/pack/*`, newCfg.input)
  shelljs.cp(`-f`, `${pkgDir}/script/npm-pkg/shim/win/main.exe`, newCfg.input)
  shelljs.cp(`-f`, `${pkgDir}/script/npm-pkg/shim/win/favicon.ico`, newCfg.input)
  shelljs.cp(`-f`, cfg.icon, `${newCfg.input}/favicon.ico`)
  fs.statSync(cfg.input).isDirectory() && shelljs.cp(`-fr`, `${cfg.input}/*`, newCfg.input)
  if(fs.existsSync(`${cfg.input}/package.json`) === false) {
    const newStr = simpleTemplate(fs.readFileSync(`${newCfg.input}/package.json`, `utf8`), {
      page: getIndex(cfg),
    })
    fs.writeFileSync(`${newCfg.input}/package.json`, newStr)
  }
  return newCfg
}


export async function fn(argv) {
  const cfg = await parseArgv(argv)
  const {input, icon} = genFile(cfg)
  cfg.input = input
  cfg.icon = icon
  console.log(cfg)
  await zip(cfg)

}
