<template>
  <div class="error-code-repair-tool flex justify-center items-center h-screen">
    <div>
      <h1>错误代码修复工具</h1>
      <p class="text-#999">专治各种Windows系统错误代码，累计修复数 {{ fixedPc }} 多台电脑</p>
      <div class="flex justify-center">
        <div class="text-left pl-10">
          <strong class="text-lg">你是否被以下问题困扰：</strong>
          <ul>
            <li>系统关键DLL文件缺失导致软件无法正常启动，错误码为0x000000</li>
            <li>Windows 10出现了安全错误或Windows验证产品密钥失败，导致错误码为0x80000**</li>
            <li>Windows 10系统更新异常导致共享打印机连接错误，错误码为0x0000011b</li>
            <li>C++ Redistributable运行时库未正确安装，导致软件无法启动</li>
            <li>Flash插件未安装或未成功加载，导致提示应用程序初始化错误</li>
            <li>DirectX库在Windows 10系统下无法加载，导致系统开机时直接报错</li>
            <li>系统未正确注册动态链接库（DLL），导致产生错误代码0x8000****</li>
          </ul>
        </div>
        <div class="w-500px">
          <swiper :modules="modules" :pagination="{ clickable: true }">
            <swiper-slide v-for="item in swiperList" :key="item">
              <img :src="item" alt="">
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="buttons">
        <button class="btn btn-primary" @click="repairErrorCode">一键修复错误代码</button>
        <button class="btn" @click="enterManualRepair" v-if="false">进入手动修复</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Pagination } from 'swiper'
// import http from '@/http.js'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css'

import 'swiper/css/pagination'

export default {
  name: 'ErrorCodeRepairTool',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      fixedPc: 20000, // 已经修复的 pc 数量
      swiperList: [
        `/image/image_1.png`,
        `/image/image_2.png`,
        `/image/image_3.png`,
        `/image/image_4.png`,
        `/image/image_5.png`,
        `/image/image_6.png`,
      ],
    }
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
  methods: {
    repairErrorCode() {
      // 这里编写一键修复错误代码的逻辑  
      console.log('开始修复错误代码...', this.$router.push(`/ScanIng`));
    },
    enterManualRepair() {
      // 这里编写进入手动修复的逻辑  
      console.log('进入手动修复模式...');
    }
  }
}  
</script>

<style scoped>
li {
  font-size: 14px;
}

.error-code-repair-tool {
  text-align: center;
  background-color: #fff;
}

.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.tool-icon i {
  font-size: 2em;
  /* 假设你使用了 Font Awesome 图标库 */
  color: #333;
  margin-right: 10px;
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  margin: 0 10px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn:hover {
  opacity: 0.8;
}
</style>