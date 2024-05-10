class Api {
  constructor(base) {
    this.base = base
    this.msg = new this.base.Msg()
  }
  async on (eventName, handler) {
    this.msg.on(eventName, handler)
  }
  async off (eventName, handler) {
    this.msg.off(eventName, handler)
  }
  async dispatch (eventName, data) {
    // todo
    console.warn(`当前封装暂不能根据实例区分事件`)
  }
  async broadcast (eventName, data) {
    this.msg.emit(eventName, {detail: data})
  }
}
export default Api
