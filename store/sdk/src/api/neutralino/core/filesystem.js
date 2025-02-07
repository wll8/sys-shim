import NeutralinoError from "@/api/neutralino/errors/index.js"
import * as StatusCode from "@/api/neutralino/errors/status-code.js"
import * as util from "@/util.js"

class Filesystem {
  constructor(base) {
    this.base = base
  }
  /**
   * Creates a directory or multiple directories recursively.
   * @param {string} path -- directory path
   * @return {Promise} Promise object represents the directory path
   */
  async createDirectory(path) {
    const [isFailed, result] = await this.base.native.fsys.createDir(path)
    if (isFailed) {
      throw new NeutralinoError(StatusCode.NE_FS_DIRCRER, path)
    }
    return result
  }

  /**
   * Removes a directory or file.
   * @param {string} path
   * @returns {Promise} Promise object represents the directory path operation result(true or false)
   */
  async remove(path) {
    const [isFailed, result] = await this.base.native.fsys.remove(path)
    if (isFailed) {
      throw new NeutralinoError(StatusCode.NE_FS_REMVERR, path)
    }
    return result
  }
  /**
   * Writes a text file.
   * @param {string} filename
   * @param {string} data
   * @returns {Promise}
   */
  async writeFile(filename, data){
    const [isFailed, res] = await globalThis.main.ws.call(`run`, [``, filename, data])
    if (isFailed) {
      throw new NeutralinoError(StatusCode.NE_FS_FILWRER, `filesystem.writeFile`)
    }
    return res
  }

  /**
   * Appends text content to file.
   * @param {string} filename
   * @param {string} data
   * @returns {Promise}
   */
  async appendFile(filename, data) {
    const [isFailed, res] = await globalThis.main.ws.call(`run`, [``, filename, data])
    if (isFailed) {
      throw new NeutralinoError(StatusCode.NE_FS_FILWRER, `filesystem.appendFile`)
    }
    return res
  }
  /**
   * Writes a binary file
   * @param {string} filename
   * @param {ArrayBuffer} data
   */
  async writeBinaryFile(filename, data) {
    const json = {
      type: `Buffer`,
      data: [...new Int8Array(data)],
    }
    await globalThis.main.ws.call(
      `run`,
      [
        ``,
        filename,
        json,
      ],
    )
  }
  /**
   * Appends binary data to a file
   * @param {string} filename
   * @param {ArrayBuffer} data
   */
  appendBinaryFile(filename, data){
    console.warn(`// todo`)
  }
  /**
  * Reads a text file
  * @param {string} filename
  *
  */
  async readFile(filename, arg = {
    pos: undefined, // 文件光标位置
    size: undefined,
  }) {
    const [isFailed, res] = await globalThis.main.ws.call(`run`, [``, filename, arg])
    if (isFailed) {
      throw new NeutralinoError(StatusCode.NE_FS_FILWRER, `filesystem.readFile`)
    }
    return res
  }
  async readBinaryFile(filename, arg = {
    pos: undefined, // 文件光标位置
    size: undefined,
  }) {
    const [isFailed, res] = await globalThis.main.native.string.loadBuffer(filename)
    const array = util.binaryArrayToBuffer(res.data)
    return array
  }
  /**
   * Creates a readable file stream
   * @param {string} filename
   */
  openFile(filename) {
    console.warn(`// todo`)
  }
  /**
  * invokes file stream actions.
  * @param { number } id     - File stream identifier.
  * @param { string } action - An action to take.
  * @param { object } data   - Additional data for the action.
  */
  updateOpenedFile(id, action, data) {
    console.warn(`// todo`)
  }

}
export default Filesystem
