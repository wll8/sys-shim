class Api {
  constructor(base) {
    this.base = base
  }
  async exit (exitCode) {
    this.killProcess()
  }
  async killProcess () {
    this.base.nativeMain.G.killAll()
  }
  async restartProcess () {
    console.warn(`// todo`)
  }
  async getConfig () {
    return (await this.base.nativeMain.G)[1].config
  }
  async broadcast (eventName, ...arg) {
    return await this.base.nativeMain.G.rpcServer.publish(eventName, ...arg)
  }
  async readProcessInput (readAll) {
    console.warn(`// todo`)
  }
  async writeProcessOutput (data) {
    console.warn(`// todo`)
  }
  async writeProcessError (data) {
    console.warn(`// todo`)
  }
}
export default Api
