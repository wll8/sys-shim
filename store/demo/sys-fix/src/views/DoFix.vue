<template>
  <div class="result-container justify-center flex justify-center items-center h-screen">
    <div class="log" v-show="log">修复中：{{ log }}</div>
  </div>
</template>

<script>
import { randomNumBoth, randomWithToken, removeLeft } from '@/util.js'

export default {
  data() {
    return {
      log: ``,
    };
  },
  created() {
    this.regsvr32()
  },
  methods: {
    async regsvr32() {
      const msg = new globalThis.sys.Msg()
      const onTag = `${Date.now()}`
      msg.on(onTag, (out, err) => {
        this.log = [out, err].join(``)
        console.log(out)
      })
      const [, getSysDir] = await sys.native.fsys.getSysDir()
      await sys.ws.call(`run`, [``])
      this.log = ``
      msg.off(onTag)
      alert(`修复完成`)
    }
  }
};
</script>

<style scoped>
.log {
  box-sizing: border-box;
  padding: 0 10px;
  text-align: left;
  color: #ccc;
  width: 80%;
}
.result-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.success-icon {
  font-size: 32px;
  color: #4CAF50;
}

.detail-item {
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
}
.detail-item + .detail-item {
  margin-top: 10px;
}

.repair-button {
  background-color: #00bfff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  font-size: 20px;
  cursor: pointer;
}
</style>