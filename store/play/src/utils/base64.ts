export function encode64(text: string) {
  return btoa(String.fromCharCode(...new TextEncoder().encode(text)))
}

export function decode64(text: string) {
  return new TextDecoder().decode(Uint8Array.from(atob(text), c => c.charCodeAt(0)))
}

/**
 *  JSON对象转base64
 * @param content 传入内容
 */
export function objectToBase64(content: any) {
  const value = JSON.stringify(content)
  return encode64(value)
}
/**
 * base64 转 JSON对象
 * @param base64 传入内容
 */
export function base64ToObject(base64: string) {
  const content = decode64(base64)
  return JSON.parse(content)
}
