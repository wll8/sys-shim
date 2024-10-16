import { findStatusCodeDesc } from "@/api/neutralino/errors/status-code-utils"

class NeutralinoError {
  /**
   *
   * @param {string} code status code
   * @param {?any} key incorrect keywords such as the method or attribute were not used successfully
   */
  constructor(code, key=``){
    return {
      code,
      message: findStatusCodeDesc(code, key),
    }
  }
}
export default NeutralinoError
