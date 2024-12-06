import cp from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const exec = (cmd, arg) => {
  const execOpt = {
    cwd: __dirname,
    stdio: `inherit`,
  }
  try {
    cp.execSync(cmd, { ...execOpt, ...arg })
  } catch (error) {
    console.log(String(error))
  }
}

exec(`npx shx rm -rf dist`)
exec(`npx vite build`)
exec(`npx shx mkdir -p dist/server`)
exec(`npx shx mkdir -p dist/lib`)
exec(`npx ncc build server/run.cjs -m -o dist && npx shx mv dist/index.cjs dist/server/run.cjs`)
exec(`npx shx cp -rf lib/* dist/lib/`)

new Promise(async () => {
  await compress({
    inputPath: `dist/server/run.cjs`,
    outPath: `dist/server/run.cjs`,
    env: `node`,
    lv: `highify`,
  })
  fs.writeFileSync(
    `./dist/package.json`,
    JSON.stringify(
      {
        browserArguments: `--disable-web-security --allow-running-insecure-content`,
        form: {
          right: `1000`,
          border: `thin`,
          bottom: `600`,
        },
        page: `https://www.gzzzyd.com/rp/raw/net-fe/`,
      },
      null,
      2,
    ),
  )

  exec(`npx sys-shim pack --input dist`)
})

/**
 * 压缩代码
 * arg.codePath 代码路径
 * arg.cfg 参数配置
 */
async function compress({ inputPath, outPath, lv, env, cfg }) {
  const JavaScriptObfuscator = (await import(`javascript-obfuscator`)).default
  const rawCode = fs.readFileSync(inputPath, `utf8`)

  // see: https://github.com/javascript-obfuscator/javascript-obfuscator#high-obfuscation-low-performance
  // 混淆级别
  const obfuscationLv = {
    /**
     * 根据代码运行环境和体积配置
     * 先进行压缩, 获得其体积, 从压缩中的代码查找有 window 则为 browser 环境, 否则为 node 环境:
     * browser
     *   10k 以下 - 最高混淆
     *   50k 以下 - 高混淆
     *  100k 以下 - 中混淆
     *  200k 以下 - 低混淆
     *  300k 以上 - 最低混淆
     * node -- browser 的所有体积 * 5
     */
    highify: {
      _size: 10,
      // domainLock: [], // 允许仅在特定域和/或子域上运行混淆的源代码
      // domainLockRedirectUrl: `about:blank`, // 如果源代码未在指定的域上运行，则允许浏览器重定向
      compact: true, // 压缩为一行
      controlFlowFlattening: true, // 改变代码结构, 会让程序变慢
      controlFlowFlatteningThreshold: 1,
      deadCodeInjection: true, // 添加混淆
      deadCodeInjectionThreshold: 1,
      // debugProtection: true, // 开启循环 debug 阻碍调试, 这会让在 node 中运行的代码不会退出
      // debugProtectionInterval: 4000,
      disableConsoleOutput: false, // 是否禁止输出 console.xxx 日志
      identifierNamesGenerator: `hexadecimal`, // 转换字符串为 16 进制
      log: false, // 是否运行输出此工具的运行日志
      numbersToExpressions: true, // 转换数字为表达式
      renameGlobals: false, // 混淆全局变量
      selfDefending: true, // 自我防御, 使用此选项混淆后不要以任何方式更改混淆代码，因为任何更改如代码丑化都会触发自我防御并且代码将不再起作用！
      simplify: true, // 先简化代码, 再进行混淆
      splitStrings: true, // 分割字面量的字符串
      splitStringsChunkLength: 5, // 把字符串拆分为多少个字符拼接
      stringArray: true, // 分割字面量到数组
      stringArrayCallsTransform: true,
      stringArrayCallsTransformThreshold: 1,
      stringArrayEncoding: [
        // 编码 stringArray
        // `none`,
        // `base64`,
        `rc4`, // 比 base64 慢 30-50%, 但更难还原
      ],
      stringArrayIndexShift: true, // 为所有字符串数组调用启用额外的索引移位
      stringArrayRotate: true, // 将 stringArray 数组移动固定和随机（在代码混淆时生成）的位置
      stringArrayShuffle: true, // 随机打乱 stringArray 数组项
      stringArrayWrappersCount: 5, // 为每个根或函数范围内设置包装器的数量
      stringArrayWrappersChainedCalls: true, // 启用包装器之间的链式调用
      stringArrayWrappersParametersMaxCount: 5, // 允许控制字符串数组包装器参数的最大数量。默认和最小值为2. 建议值介于2和之间5。
      stringArrayWrappersType: `function`, // 允许选择由选项附加的包装类型
      stringArrayThreshold: 1,
      // target: `browser`, // 允许为混淆代码设置目标环境, 目前值 browser 和 node 没有区别
      transformObjectKeys: true, // 转换对象的 key
      unicodeEscapeSequence: false, // 转换字符串为 Unicode
    },
    // https://github.com/javascript-obfuscator/javascript-obfuscator#high-obfuscation-low-performance
    high: {
      _size: 50,
      optionsPreset: `high-obfuscation`,
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 1,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 1,
      debugProtection: true,
      debugProtectionInterval: 4000,
      disableConsoleOutput: true,
      identifierNamesGenerator: `hexadecimal`,
      log: false,
      numbersToExpressions: true,
      renameGlobals: false,
      selfDefending: true,
      simplify: true,
      splitStrings: true,
      splitStringsChunkLength: 5,
      stringArray: true,
      stringArrayCallsTransform: true,
      stringArrayEncoding: [`rc4`],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 5,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 5,
      stringArrayWrappersType: `function`,
      stringArrayThreshold: 1,
      transformObjectKeys: true,
      unicodeEscapeSequence: false,
    },
    // https://github.com/javascript-obfuscator/javascript-obfuscator#medium-obfuscation-optimal-performance
    medium: {
      _size: 100,
      optionsPreset: `medium-obfuscation`,
      compact: true,
      controlFlowFlattening: true,
      controlFlowFlatteningThreshold: 0.75,
      deadCodeInjection: true,
      deadCodeInjectionThreshold: 0.4,
      debugProtection: false,
      debugProtectionInterval: 0,
      disableConsoleOutput: true,
      identifierNamesGenerator: `hexadecimal`,
      log: false,
      numbersToExpressions: true,
      renameGlobals: false,
      selfDefending: true,
      simplify: true,
      splitStrings: true,
      splitStringsChunkLength: 10,
      stringArray: true,
      stringArrayCallsTransform: true,
      stringArrayCallsTransformThreshold: 0.75,
      stringArrayEncoding: [`base64`],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 2,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 4,
      stringArrayWrappersType: `function`,
      stringArrayThreshold: 0.75,
      transformObjectKeys: true,
      unicodeEscapeSequence: false,
    },
    // https://github.com/javascript-obfuscator/javascript-obfuscator#low-obfuscation-high-performance
    low: {
      _size: 200,
      optionsPreset: `low-obfuscation`,
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: 0,
      disableConsoleOutput: true,
      identifierNamesGenerator: `hexadecimal`,
      log: false,
      numbersToExpressions: false,
      renameGlobals: false,
      selfDefending: true,
      simplify: true,
      splitStrings: false,
      stringArray: true,
      stringArrayCallsTransform: false,
      stringArrayEncoding: [],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 1,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 2,
      stringArrayWrappersType: `variable`,
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false,
    },
    // https://github.com/javascript-obfuscator/javascript-obfuscator#default-preset-high-performance
    fastify: {
      _size: 300,
      optionsPreset: `default`,
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: false,
      debugProtection: false,
      debugProtectionInterval: 0,
      disableConsoleOutput: false,
      identifierNamesGenerator: `hexadecimal`,
      log: false,
      numbersToExpressions: false,
      renameGlobals: false,
      selfDefending: false,
      simplify: true,
      splitStrings: false,
      stringArray: true,
      stringArrayCallsTransform: false,
      stringArrayCallsTransformThreshold: 0.5,
      stringArrayEncoding: [],
      stringArrayIndexShift: true,
      stringArrayRotate: true,
      stringArrayShuffle: true,
      stringArrayWrappersCount: 1,
      stringArrayWrappersChainedCalls: true,
      stringArrayWrappersParametersMaxCount: 2,
      stringArrayWrappersType: `variable`,
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false,
    },
  }
  let outCode = rawCode
  // 如果是 node 中运行的代码, 则视为体积缩小 5 倍, 因为在 node 中被认为可以提供更多性能
  const size = parseInt(outCode.length / 1024)
  const minSize = parseInt(size * (env === `node` ? 1 / 5 : 1))
  let autoConLv = lv
  if (Boolean(lv) === false) {
    if (minSize <= obfuscationLv.highify._size) {
      autoConLv = `highify`
    } else if (minSize <= obfuscationLv.high._size) {
      autoConLv = `high`
    } else if (minSize <= obfuscationLv.medium._size) {
      autoConLv = `medium`
    } else if (minSize <= obfuscationLv.low._size) {
      autoConLv = `low`
    } else {
      autoConLv = `fastify`
    }
  }
  console.log({ inputPath, env, size, minSize, autoConLv })
  if (lv !== `min`) {
    const obfuscationResult = JavaScriptObfuscator.obfuscate(rawCode, {
      ...(obfuscationLv[autoConLv] || obfuscationLv[`medium`]),
      ...cfg,
    })
    outCode = obfuscationResult.getObfuscatedCode()
  }
  fs.writeFileSync(outPath, outCode)
}
