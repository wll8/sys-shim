import process from 'node:process'
import child_process from 'node:child_process'

export async function getPath7za() {
  const { path7za } = (await import('7zip-bin')).default
  if(process.platform === `linux`) {
    exec(`chmod +777 "${path7za}"`)
  }
  return path7za
}

export const exec = (cmd, opt) => {
  console.log(cmd)
  try {
    child_process.execSync(cmd, {
      cwd: `./`,
      stdio: `inherit`,
      ...opt,
    })
  } catch (err) {
    console.log(err)
  }
}

/**
 * 解析命令行参数
 * @param {*} arr 
 * @returns 
 */
export function parseArgv(arr) {
  return (arr || process.argv.slice(2)).reduce((acc, arg) => {
    let [k, ...v] = arg.split('=')
    v = v.join(`=`) // 把带有 = 的值合并为字符串
    acc[k] = v === '' // 没有值时, 则表示为 true
      ? true
      : (
        /^(true|false)$/.test(v) // 转换指明的 true/false
          ? v === 'true'
          : (
            /[\d|.]+/.test(v)
              ? (isNaN(Number(v)) ? v : Number(v)) // 如果转换为数字失败, 则使用原始字符
              : v
          )
      )
    return acc
  }, {})
}