enum StorageType {
  Local,
  Session,
}
class Cache {
  storage: Storage
  constructor(type: StorageType) {
    this.storage = type === StorageType.Local ? localStorage : sessionStorage
  }

  setCache(key: string, value: any) {
    if (key && value)
      this.storage.setItem(key, JSON.stringify(value))
  }

  getCache(key: string) {
    const value = this.storage.getItem(key)
    if (value)
      return JSON.parse(value)
  }

  removeCache(key: string) {
    this.storage.removeItem(key)
  }

  clear() {
    this.storage.clear()
  }
}
const localCache = new Cache(StorageType.Local)
const sessionCache = new Cache(StorageType.Session)
export { localCache, sessionCache }
