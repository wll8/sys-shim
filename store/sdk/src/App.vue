<script setup>
import { ref, watch, toRaw } from "vue";
const count = ref(0);
const res = ref([``]);
watch(res, async (newVal, oldVal) => {
  newVal = toRaw(newVal)
  if (typeof newVal === `object`) {
    let [a, b] = newVal;
    res.value = [`是否执行失败: ${a}`, `返回值: ${b}`].join(`\n`);
  }
});
const list = ref([]);
const ws = window.main.ws;
list.value = [
  {
    name: `创建目录`,
    async fn() {
      const dir = "C:/my/";
      res.value = await ws.call(`run`, [
        `
                  var arg = ...
                  fsys.createDir(arg)
                  `,
        dir,
      ]);
      console.log(`res.value`, res.value);
    },
  },
  {
    name: `下载文件`,
    async fn() {
      const url =
        "https://download.microsoft.com/download/7/4/A/74A33AB3-B6F3-435D-8E3E-0A9FD574347F/services-on-server-install-worksheet.xlsx";
      res.value = await ws.call(`run`, [
        `
                  var arg = ...
                  var remoteFile = inet.httpFile(arg ,"C:/my/")
                  return remoteFile.download()
                  `,
        url,
      ]);
    },
  },
  {
    name: `定位文件`,
    async fn() {
      const url = "C:/my/services-on-server-install-worksheet.xlsx";
      res.value = await ws.call(`run`, [
        `
                  var arg = ...
                  process.exploreSelect(arg);
                  `,
        url,
      ]);
    },
  },
  {
    name: `上传文件`,
    async fn() {
      res.value = await ws.call(`run`, [
        `
                  var http = inet.http(); 
                  http.addHeaders = "Name1:value1";  
                  var formData = web.multipartFormData();
                  formData.add("file1","@C:/my/services-on-server-install-worksheet.xlsx") 
                  var data = http.post("http://httpbin.org/post" 
                    , formData.readAll()
                    , formData.contentHeader() 
                  );
                  return data
                  `,
      ]);
    },
  },
  {
    name: `打开文件`,
    async fn() {
      res.value = await ws.call(`run`, [
        `
                  process.execute("C:/my/services-on-server-install-worksheet.xlsx")
                  `,
      ]);
    },
  },
  {
    name: `打开记事本`,
    async fn() {
      res.value = await ws.call(`run`, [
        `
                  process.execute("notepad")
                  `,
      ]);
    },
  },
  {
    name: `删除目录`,
    async fn() {
      res.value = await ws.call(`run`, [
        `
                  import process.popen
                  process.popen("cmd /k rd /s /q C:\\my")
                  `,
      ]);
    },
  },
  {
    name: `弹窗`,
    async fn() {
      main.win.msgbox(`hello`);
    },
  },
  {
    name: `退出`,
    async fn() {
      main.win.quitMessage();
    },
  },
];
</script>

<template>
  <div>
    <div>sys-shim</div>
    <button v-for="(item, index) in list" :key="index" @click="item.fn">
      {{ item.name }}
    </button>
    <hr />
    <textarea disabled id="" cols="50" rows="10" :value="res"></textarea>
  </div>
</template>

<style scoped>
</style>
