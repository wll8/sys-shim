/**
 * 获取指定范围内的随机数
 * @param {*} m 包含 m
 * @param {*} n 包含 n
 * @returns 
 */
export function randomNumBoth(Min, Max) {
  let Range = Max - Min
  let Rand = Math.random()
  let num = Min + Math.round(Rand * Range) //四舍五入
  return num
}

export function seededRandom(min, max, seed) {
  var maxInt = Math.pow(2, 32);
  var x = Math.sin(seed) * maxInt;
  x = x - Math.floor(x);
  return Math.floor(x * (max - min + 1) + min);
}

export function randomWithToken(a, b, token = `x`.repeat(32)) {
  if (token !== undefined) {
    // 创建一个简单的哈希来用作种子
    var hash = 0;
    for (var i = 0; i < token.length; i++) {
      var char = token.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // 转换为32位整数
    }
    return seededRandom(a, b, hash);
  } else {
    // 如果没有提供token，就生成一个真正的随机数
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }
}

/**
 * 删除左边空格
 * @param {*} str
 * @returns
 */
export function removeLeft(str) {
  const lines = str.split(`\n`)
  // 获取应该删除的空白符数量
  const minSpaceNum = lines.filter(item => item.trim())
    .map(item => item.match(/(^\s+)?/)[0].length)
    .sort((a, b) => a - b)[0]
  // 删除空白符
  const newStr = lines
    .map(item => item.slice(minSpaceNum))
    .join(`\n`)
  return newStr
}
