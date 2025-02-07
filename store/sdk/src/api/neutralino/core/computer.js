class Api {
  constructor(base) {
    this.base = base
  }
  async getOSInfo () {
    // todo
    return {
      "description": `Microsoft Windows 10 专业版`,
      "name": `Windows NT`,
      "version": `10.0.19045-4046`,
    }
  }
}
export default Api
