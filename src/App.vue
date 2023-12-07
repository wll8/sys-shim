<template>
  <div class="about">
    <button v-for="(item, index) in list" :key="index" @click="item.fn">
      {{ item.name }}
    </button>
    <hr />
    <textarea disabled id="" cols="50" rows="10" :value="res"></textarea>
  </div>
</template>

<script>
export default {
  components: {},
  created() {
  },
  data() {
    const vm = this
    return {
      res: ``,
      list: [
        {
          name: `hello`,
          async fn() {
            /**
              等于 main.ws.call(`win.callFn`, [`msgbox`, `hello`])
             */
            await window.main.win.msgbox(`hello`)
          },
        },
        {
          name: `选择文件`,
          async fn() {
            vm.res = await main.fsys.dlg.open()
            
          },
        },
        {
          name: `获取当前窗口标题`,
          async fn() {
            vm.res = await main.win.title.then
          },
        },
        {
          name: `创建 uuid`,
          async fn() {
            /**
              等于 await main.ws.call(`win.callFn`, [`guid.create`])
             */
            vm.res = await main.win.guid.create()
          },
        },
      ],
    }
  },
  watch: {
    res(newVal, oldVal) {
      if (typeof newVal === `object`) {
        let [ok, res] = newVal
        this.res = [`状态: ${ok}`, `返回值: ${res}`].join(`\n`)
      }
    },
  },
  methods: {
  },
}
</script>
