import NeutralinoError from "@/api/neutralino/errors/index"
import * as StatusCode from "@/api/neutralino/errors/status-code"
class Clipboard {
  constructor(base) {
    this.base = base
  }
  /**
   * Writes text into the system clipboard.
   * @param {string} text
   * @returns {Promise}
   */
  async writeText(text) {
    const [isFailed, value] = await this.base.native.win.clip.write(text)
    if(isFailed){
      throw new NeutralinoError(StatusCode.NE_RT_NATPRME, `clipboard.writeText`)
    }
    return value
  }
  /**
   * Reads and returns text from system clipboard.
   * @returns {Promise}
   */
  async readText() {
    const [isFailed, text] = await this.base.native.win.clip.read()
    if(isFailed){
      throw new NeutralinoError(StatusCode.NE_RT_NATPRME, `clipboard.readText`)
    }
    return text
  }
}
export default Clipboard
