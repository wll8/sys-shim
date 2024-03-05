import DeepProxy from 'proxy-deep'

const KEYS_MAP = new Map();

function nullishCoalescing(left, right) {
  return (left !== null && left !== undefined) ? left : right;
}

function get([key]) {
  return nullishCoalescing(KEYS_MAP.get(key), key)
}

/**
 * 创建一个代理器，支持 Promise
 */
function mockObj(raw, cfg = {}) {
  cfg = {
    deep: {
      set(key, val) {
        let err, res
        try {
          deepSet(raw, key, val)
          res = deepGet(raw, key)
        } catch (error) {
          err = error
        }
        return [err, res]
      },
      get(key) {
        let err, res
        try {
          res = deepGet(raw, key)
        } catch (error) {
          err = error
        }
        return [err, res]
      },
      call(key, ...arg) {
        let err, res
        try {
          res = deepGet(raw, key)(...arg)
        } catch (error) {
          err = error
        }
        return [err, res]
      }
    },
    keys: [`then`, `catch`, `finally`], // 特殊处理 Key
    ...cfg,
  }
  const { keys, deep } = cfg
  keys.forEach(key => {
    let _val = Symbol(key)
    KEYS_MAP.set(key, _val);
    KEYS_MAP.set(_val, key);
  })

  function getPaths(paths = []) {
    return [...paths]
      .filter((item) => ['string', 'symbol'].includes(typeof item))
      .map(item => {
        if (keys.map(key => get([key])).includes(item)) {
          return get([item])
        }
        return item
      })
  }
  function msg(type, ...arg) {
    if (msg.state === 'padding') {
      console
      msg.queue = nullishCoalescing(msg.queue, []);
      return new Promise((res, rej) => {
        msg.queue.push({ args: [type, ...arg], res, rej })
      });
    }
    return new Promise((res, rej) => {
      const val = {
        get: deep.get,
        set: deep.set,
        call: deep.call,
      }[type]
      msg.state = 'padding'
      let result = val(...arg)
      res(result);
      msg.state = 'done'
      if (msg.queue.length) {
        let data = msg.queue.shift()
        msg(...data.args).then(res => data.res(res)).catch(err => data.rej(err))
      }
    })
  }

  const proxy = new DeepProxy(
    () => { },
    {
      get(target, path, receiver) {
        const paths = getPaths(this.path);
        if (cfg.keys.includes(path)) {
          let promise = new Promise(async (res, rej) => {
            try {
              let value = await msg(`get`, paths)
              res(value)
            } catch (e) {
              rej(e)
            }
          })
          return promise[path].bind(promise)
        }
        else {
          return this.nest()
        }
      },
      set(target, path, value) {
        const paths = getPaths([...this.path, path]);
        const res = msg(`set`, paths, value)
        return res
      },
      apply(target, thisArg, argList) {
        const paths = getPaths(this.path);
        const res = msg(`call`, paths, ...argList)
        return res
      },
    }
  )
  return proxy
}

function deepGet(object, keys = []) { // 深层获取对象值
  return (!Array.isArray(keys)
    ? keys
      .replace(/\[/g, `.`)
      .replace(/\]/g, ``)
      .split(`.`)
    : keys
  ).reduce((o, k) => o[k], object)
}

function deepSet(object, keys, val) { // 深层设置对象值
  keys = Array.isArray(keys) ? keys : keys
    .replace(/\[/g, `.`)
    .replace(/\]/g, ``)
    .split(`.`)
  if (keys.length > 1) {
    object[keys[0]] = object[keys[0]] || {}
    deepSet(object[keys[0]], keys.slice(1), val)
    return object
  }
  object[keys[0]] = val
  return object
}

export default mockObj
