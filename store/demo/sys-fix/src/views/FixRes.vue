<template>
  <div class="result-container justify-center flex justify-center items-center h-screen">
    <div class="flex justify-center">
      <div class="w-300px text-center p-40px">
        <div class="icon-container">
          <i class="fa fa-check-circle color-green fa-5x"></i>
        </div>
        <h2>恭喜您，扫描检测完成</h2>
        <p>异常资源库已准备就绪，还差一步即可完成修复，请点击“<span color-red-500>立即修复</span>”按钮</p>
      </div>
      <div class="w-300px text-left p-40px bg-gray-100 rounded-md pt-20px">
        <h3>扫描结果</h3>
        <div h-1px class="bg-gray-400" m-t-20px m-b-10px></div>
        <div class="details">
          <div class="flex justify-between text-xl ">
            <span>共扫描电脑异常问题：<br><span color-gray-400>&nbsp;</span></span>
            <strong>{{ totalErrors }}</strong>
          </div>
          <div class="detail-item">
            <span>系统错误代码扫描：<br><span color-gray-400 font-size-14px>您的电脑所有动态链接库的错误</span></span>
            <strong>{{ systemErrors }}</strong>
          </div>
          <div class="detail-item">
            <span>用户相关的错误：<br><span color-gray-400 font-size-14px>您的 Windows 帐户个别错误</span></span>
            <strong>{{ userErrors }}</strong>
          </div>
          <div class="detail-item">
            <span>其他相关的错误：<br><span color-gray-400 font-size-14px>您的电脑已安装程序的错误</span></span>
            <strong>{{ otherErrors }}</strong>
          </div>
        </div>
      </div>
    </div>
    <div class="log" v-show="log">修复中：{{ log }}</div>
    <button :class="[`repair-button mt-10px p-50px`, {'g-disable': log}]" @click="startRepair">立即修复</button>
  </div>
</template>

<script>
import { randomNumBoth, randomWithToken, removeLeft } from '@/util.js'

export default {
  data() {
    return {
      log: ``,
      totalErrors: 0,
      systemErrors: 0,
      userErrors: 0,
      otherErrors: 0
    };
  },
  created() {
    console.log(`useDllStore()`, this.$route.params)
    this.getErrDetailMock()
  },
  methods: {
    // 获取错误详情，模拟
    getErrDetailMock() {
      const {itemsOkListLength, fixNum} = this.$route.query
      this.totalErrors = itemsOkListLength
      this.systemErrors = randomWithToken(0, fixNum)
      this.userErrors = randomWithToken(0, fixNum - this.systemErrors)
      this.otherErrors = fixNum - this.systemErrors - this.userErrors
    },
    async startRepair() {
      // this.$router.push(`/DoFix`)
      this.regsvr32()
    },
    async regsvr32() {
      const msg = new globalThis.sys.Msg()
      const onTag = `${Date.now()}`
      msg.on(onTag, (out, err) => {
        this.log = [out, err].join(``).replace(/.*>/, ``)
        console.log(out)
      })
      const [, getSysDir] = await sys.native.fsys.getSysDir()
      const [, sysRoot] = await sys.native.string.getenv("SystemRoot")
      const sysDllPath = `${sysRoot}\\system32`
      await sys.ws.call(`run`, [`
        var prcs = process.popen.cmd(\`
          for %1 in (${sysDllPath}\\*.dll) do regsvr32.exe /s %1 
        \`)
        for( all,out,err in prcs.each() ){
          thread.command.publish("${onTag}", out, err)
        }
        var prcs = process.popen.cmd(\`
          for %1 in (${getSysDir}\\*.dll) do regsvr32.exe /s %1 
        \`)
        for( all,out,err in prcs.each() ){
          thread.command.publish("${onTag}", out, err)
        }
      `])
      this.log = ``
      msg.off(onTag)
      alert(`修复完成`)
    },
    async regsvr32Item() {
      const msg = new globalThis.sys.Msg()
      const onTag = `${Date.now()}`
      msg.on(onTag, (out, err) => {
        this.log = [out, err].join(``)
        console.log(out)
      })
      const [, getSysDir] = await sys.native.fsys.getSysDir()
      await sys.ws.call(`run`, [`
        var prcs = process.popen.cmd(\`
          for %1 in (${getSysDir}\\*.dll) do regsvr32.exe /s %1 
        \`)
        for( all,out,err in prcs.each() ){
          thread.command.publish("${onTag}", out, err)
        }
      `])
      this.log = ``
      msg.off(onTag)
      alert(`修复完成`)
    },
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
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-overflow: ellipsis; /* 使用省略号表示被修剪的文本 */
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