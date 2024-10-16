const STATE_DEFAULT = 0
const STATE_STRING = 1
const STATE_CHARACTER = 2
const STATE_KEYWORD = 3
const STATE_COMMENTBLOCK = 4
const STATE_COMMENTLINE = 5

const keywordList = [
  'begin',
  'end',
  'false',
  'true',
  'if',
  'else',
  'elseif',
  'class',
  'function',
  'return',
  'while',
  'do',
  'namespace',
  'select',
  'case',
  'catch',
  'try',
  'for',
  'in',
  'this',
  'global',
  'self',
  'owner',
  'var',
  'def',
  'null',
  'and',
  'not',
  'or',
  'break',
  'continue',
  'import',
  'with',
  'ctor',
  'try',
  'catch',
  'eval',
  'import',
  'type',
  'assert',
  'assertf',
  'error',
  'rget',
  'loadcode',
  'dumpcode',
  'collectgarbage',
  'call',
  'tostring',
  'topointer',
  'tonumber',
  'sleep',
  'execute',
  'setlocale',
  'setprivilege',
  'null',
]

function StyleContent(str, length, initState) {
  this.str = str
  this.result = []
  this.currentPos = -1
  this.length = length
  this.coloredLength = 0
  this.ch = 0
  this.state = initState || STATE_DEFAULT
  this.read()
}

StyleContent.prototype = {
  more() {
    return this.currentPos < this.length
  },

  read() {
    if (this.more()) {
      this.currentPos++
      this.lastCh = this.ch
      this.ch = this.str.substr(this.currentPos, 1)
    }
    else {
      return false
    }
  },

  readBack() {
    if (this.currentPos > 0) {
      this.currentPos -= 2
      this.read()
    }
    else {
      return false
    }
  },

  colorTo(posEnd, state) {
    this.state = state
    const text = this.str.substring(this.coloredLength, posEnd + 1)
    // text = text.split('\t').join('&nbsp;&nbsp;&nbsp;&nbsp;').split(' ').join('&nbsp;');
    // text = text.split('<').join('&lt;').split('>').join('&gt;');
    // text = text.split('\r\n').join('<br />').split('\n').join('<br />').split('\r').join('<br />');
    this.result.push({
      text,
      state,
    })
    this.coloredLength = posEnd + 1
  },

  writeResult() {
    const node = document.createElement('div')
    for (const k in this.result) {
      let className
      switch (this.result[k].state) {
        case STATE_STRING:
          className = 'aau_string'
          break
        case STATE_CHARACTER:
          className = 'aau_character'
          break
        case STATE_KEYWORD:
          className = 'aau_keyword'
          break
        case STATE_COMMENTBLOCK:
          className = 'aau_commentblock'
          break
        case STATE_COMMENTLINE:
          className = 'aau_commentline'
          break
        default:
          className = 'aau_default'
      }
      const span = document.createElement('span')
      span.className = className
      span.innerHTML = this.result[k].text
      node.appendChild(span)
    }
    return node.innerHTML
  },
}

function inArray(arr, ele) {
  for (const k in arr) {
    if (arr[k] === ele)
      return k
  }
  return -1
}

function highlightCode(code) {
  // 从源代码中拆分出关键字等信息
  const sc = new StyleContent(code, code.length)
  for (; sc.more(); sc.read()) {
    switch (sc.state) {
      case STATE_DEFAULT:
        if (sc.ch === '"') {
          sc.colorTo(sc.currentPos - 1, STATE_DEFAULT)
          sc.state = STATE_STRING
        }
        else if (sc.ch === '\'') {
          sc.colorTo(sc.currentPos - 1, STATE_DEFAULT)
          sc.state = STATE_CHARACTER
        }
        else if (/[a-zA-Z_]/im.test(sc.ch) && (!sc.lastCh || /[\s;\(\)\{\},]/im.test(sc.lastCh))) {
          sc.colorTo(sc.currentPos - 1, STATE_DEFAULT)
          let word = ''
          while (/[a-zA-Z0-9_]/im.test(sc.ch)) {
            word += sc.ch
            if (sc.more())
              sc.read()
            else
              break
          }
          if (/[\s;\(\)\{\},]/im.test(sc.ch) && inArray(keywordList, word) !== -1) {
            sc.colorTo(sc.currentPos - 1, STATE_KEYWORD)
            sc.state = STATE_DEFAULT
          }
          sc.readBack()
        }
        else if (sc.ch === '*' && sc.lastCh === '/') {
          sc.colorTo(sc.currentPos - 2, STATE_DEFAULT)
          sc.state = STATE_COMMENTBLOCK
          sc.asteriskCount = 0
          while (sc.ch === '*' && sc.more()) {
            sc.asteriskCount++
            sc.read()
          }
          sc.readBack()
          sc.asteriskInputed = 0
        }
        else if (sc.ch === '/' && sc.lastCh === '/') {
          sc.colorTo(sc.currentPos - 2, STATE_DEFAULT)
          sc.state = STATE_COMMENTLINE
        }
        break
      case STATE_STRING:
        if (sc.ch === '"') {
          sc.colorTo(sc.currentPos, STATE_STRING)
          sc.state = STATE_DEFAULT
        }
        break
      case STATE_CHARACTER:
        if (sc.ch === '\'' && sc.lastCh !== '\\') {
          sc.colorTo(sc.currentPos, STATE_CHARACTER)
          sc.state = STATE_DEFAULT
        }
        break
      case STATE_COMMENTBLOCK:
        if (sc.ch === '*') {
          sc.asteriskInputed++
        }
        else if (sc.ch === '/') {
          if (sc.asteriskInputed === sc.asteriskCount) {
            sc.colorTo(sc.currentPos, STATE_COMMENTBLOCK)
            sc.state = STATE_DEFAULT
          }
        }
        else {
          sc.asteriskInputed = 0
        }
        break
      case STATE_COMMENTLINE:
        if (sc.ch === '\n') {
          sc.colorTo(sc.currentPos, STATE_COMMENTLINE)
          sc.state = STATE_DEFAULT
        }
        break
    }
  }
  sc.colorTo(sc.length - 1, sc.state)

  return sc.writeResult()
}

function style() {
  // 配置代码的样式
  const styleCode = `\
        <style data="arr" type="text/css">\
          /* 字符串样式 */\
          .lang-aau .aau_string,\
          .lang-aau .aau_character {\
            color: #800;\
          }\
          /* 关键字样式 */\
          .lang-aau .aau_keyword {\
            color: #008;\
          }\
          /* 段注释、行注释样式 */\
          .lang-aau .aau_commentblock,\
          .lang-aau .aau_commentline {\
            color: #080;\
          }\
        </style>\
      `
  // 检查是否已存在相同的样式标签
  const existingStyle = document.querySelector('head style[data="arr"]')
  if (existingStyle)
    return
  document.querySelector('head')?.insertAdjacentHTML('beforeend', styleCode)
}

export function aarHighlight(el, code) {
  style()
  el.innerHTML = highlightCode(code)
}
