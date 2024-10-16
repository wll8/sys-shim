import * as StatusCode from "@/api/neutralino/errors/status-code.js"

/**
 * find status code
 * @param {string} code status code
 * @param {?any} key incorrect keywords such as the method or attribute were not used successfully
 * @returns {string}    status code description
 */
export function findStatusCodeDesc(code, key = ``) {
  switch (code) {
    // no-error
    case StatusCode.NE_ST_OK:
      return ``
    // storage
    case StatusCode.NE_ST_INVSTKY:
      return `Invalid storage key format. The key should match regex: ${key}`
    case StatusCode.NE_ST_NOSTKEX:
      return `Unable to find storage key: ${key}`
    case StatusCode.NE_ST_STKEYWE:
      return `Unable to write data to key: ${key}`
    case StatusCode.NE_ST_NOSTDIR:
      return `Unable to read storage directory: ${key}`
    // os
    case StatusCode.NE_OS_UNLTOUP:
      return `Unable to update process id: ${key}`
    case StatusCode.NE_OS_INVNOTA:
      return `Invalid notification style arguments: ${key}`
    case StatusCode.NE_OS_INVMSGA:
      return `Invalid message box style arguments: ${key}`
    case StatusCode.NE_OS_TRAYIER:
      return `Unable to initialize the tray menu`
    case StatusCode.NE_OS_INVKNPT:
      return `Invalid platform path name: ${key}`
    // extensions
    case StatusCode.NE_EX_EXTNOTC:
      return `${key} is not connected yet`
    // filesystem
    case StatusCode.NE_FS_FILWRER:
      return `Unable to write file: ${key}`
    case StatusCode.NE_FS_DIRCRER:
      return `Cannot create a directory in ${key}`
    case StatusCode.NE_FS_REMVERR:
      return `Cannot remove path: ${key}`
    case StatusCode.NE_FS_FILRDER:
      return `Unable to open file: ${key}`
    case StatusCode.NE_FS_NOPATHE:
      return `Unable to open path ${key}`
    case StatusCode.NE_FS_COPYERR:
      return `Cannot perform copy: ${key}`
    case StatusCode.NE_FS_MOVEERR:
      return `Cannot perform move: ${key}`
    case StatusCode.NE_FS_FILOPER:
      return `Unable to open file: ${key}`
    case StatusCode.NE_FS_UNLTOUP:
      return `Unable to update opened file id: ${key}`
    case StatusCode.NE_FS_UNLTFOP:
      return `Unable to find storage key: ${key}`
    case StatusCode.NE_FS_UNLCWAT:
      return `Unable to create watcher for path: ${key}`
    case StatusCode.NE_FS_NOWATID:
      return `Unable to find watcher: ${key}`
    // window
    case StatusCode.NE_CF_UNBLWCF:
      return `Unable to load the window config file: ${key}`
    // router
    case StatusCode.NE_RT_INVTOKN:
      return `Invalid or expired NL_TOKEN value from client`
    case StatusCode.NE_RT_APIPRME:
      return `Missing permission to access Native API`
    case StatusCode.NE_RT_NATPRME:
      return `Missing permission to execute the native method: ${key}`
    case StatusCode.NE_RT_NATRTER:
      return `Native method execution error occurred. Make sure that you've provided required parameters properly.`
    case StatusCode.NE_RT_NATNTIM:
      return `${key} is not implemented in the Neutralinojs server`

    // resources
    case StatusCode.NE_RS_TREEGER:
      return `Resource file tree generation error. ${key}is missing.`
    case StatusCode.NE_RS_UNBLDRE:
      return `Unable to load application resource file ${key}`
    // server
    case StatusCode.NE_SR_UNBSEND:
      return `Unable to send native message`
    case StatusCode.NE_SR_UNBPARS:
      return `Unable to parse native call payload`
    // config
    case StatusCode.NE_CF_UNBLDCF:
      return `Unable to load the config file: \${key}`
    case StatusCode.NE_CF_UNSUPMD:
      return `Unsupported mode: \${key}. The default mode is selected.`
  }
}
