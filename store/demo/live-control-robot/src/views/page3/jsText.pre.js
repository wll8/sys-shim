if (globalThis.Sys) {
  new globalThis.Sys({ log: false })
    .then((sys) => {
      const wsInitEvent = new CustomEvent(`sys-shim-init`, { detail: { message: sys } })
      window.dispatchEvent(wsInitEvent)
    })
    .catch((err) => {
      alert(err)
    })
}
