export function binaryArrayToBuffer(binaryArray) {
  let buffer = new ArrayBuffer(binaryArray.length)
  let view = new Uint8Array(buffer)
  for (let i = 0; i < binaryArray.length; i++) {
    view[i] = binaryArray[i]
  }
  return buffer
}
