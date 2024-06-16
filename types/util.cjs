function getFleDts(filePath) {
  const fs = require(`fs`)
  const str = fs.readFileSync(filePath, `utf8`)
  const re = new RegExp(`intellisense.*\\s([\\s\\S]+?)end intellisense`, `g`)

  // 暂只处理指定命名空间
  const res = (str.match(re) || []).filter(item => {
    return (
      // 不处理 "intellisense(::)" 中的内容
      item.startsWith(`intellisense(::)`) === false
    )
  })


  let accDts = ``

  const parse = res.map(intellisense => {
    const namespace = intellisense.match(/\((.*?)\)/)[1]
    const list = intellisense.split(`\r\n`).filter(line => {
      return !line.endsWith(`intellisense`) && !line.startsWith(`intellisense`)
    }).filter(line => {
      return (
        line.trim() // 去除空行
          .match(`=`) // 去除不含描述的行，例如可能仅有 "}" 字符
      )
    }).map(line => {
      let item = line.replace(`(.(`, `(`) // 删除 (.(
      item = item.replace(`__/*`, ``).replace(`*/`, ``) // 处理 【__/*输入窗口句柄*/】 这种文字为 【输入窗口句柄】
      let [prefix, ...info] = item.split(`=`)
      prefix = prefix.trim()
      prefix = prefix.replace(`->->->`, `...arg`) // 删除 ->->->, 这应该是可变参数个数
      prefix = prefix.replace(/"/g, ``) // 删除引号
      info = info.join(``).trim().split(`\\n`).map(item => {
        item = item.replace(/\/\*(.*)\*\//, ``) // 删除注释, 否则会影响 jsdoc
        item = `${item}  ` // 添加 markdown 换行标记
        return item
      })
      let arg = (prefix.match(/\((.*)\)/) || [, ``])[1].split(`,`).map(item => {
        let str = item.trim()
        // 把参数名都加上前缀 _, 因为原注释中可能会包含 true 或 0 这种不符合参数名的关键字
        return (
          str.match(/[\u4e00-\u9fa5]/) // 中文时不处理
          || (
            str.match(/^[0-9]/) // 数字开头要做处理
              ? false
              : (
                str === `_` // 本身为 _ 不做处理
                || str === `...arg` // 扩展参数时不做处理
              )
          )
        ) ? str : `_${str}`
      })
      let word = (prefix.match(/(.*)[\(]/) || [, prefix])[1]
      let type = prefix.includes(`(`) ? `function` : `attr`
      let dts = {
        function() {
          return [
            `\n`,
            `/**`,
            `* ${info.join(`\n* `)}`,
            `*/`,
            `"${word}"(${arg.join(`, `)}): any`,
          ].join(`\n`)
        },
        attr() {
          return [
            `\n`,
            `/**`,
            `* ${info.join(`\n* `)}`,
            `*/`,
            `"${word}": any`,
          ].join(`\n`)
        },
      }[type]()

      return {
        namespace,
        dts,
        type,
        arg,
        word,
        raw: item,
        info,
      }
    }).sort((a, b) => {
      return a.word - b.word
    })
    return list
  })

  accDts = parse.flat().reduce((acc, cur) => {
    return acc + cur.dts
  }, ``)

  const dtsText = `
  declare interface dts {
    ${accDts}
  }
  `

  const out = {
    parse,
    dtsText,
  }
  return out
}

module.exports = {
  getFleDts,
}