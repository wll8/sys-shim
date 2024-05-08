<script lang="ts" setup>
import useMainStore from '@/store/main/main'
import { objectToBase64 } from '@/utils/base64'

interface NavType {
  text: string
  icon: string
  index: string
  link?: string
}

const navList: NavType[] = [
  {
    text: '分享',
    icon: 'i-carbon-share',
    index: 'share',
  },
  {
    text: '重置',
    icon: 'i-carbon-reset',
    index: 'reset',
  },
  {
    text: '设置',
    icon: 'i-carbon-settings',
    index: 'setting',
  },
  {
    text: '源码',
    icon: 'i-carbon-logo-github',
    link: 'https://github.com/wll8/sys-shim-play',
    index: 'externalLink', // 外部链接
  },
]
const settingShow = ref(false)
const mainStore = useMainStore()

async function fetchShareLink() {
  const baseURL = import.meta.env.VITE_SHARE_BASE_URL
  const link = `${baseURL}${objectToBase64(mainStore.execInfo)}`
  await window.navigator.clipboard.writeText(link)
  alert('Sharable URL has been copied to clipboard')
}

// onNavClick
function onNavClick(item: NavType) {
  // 打开设置框
  if (item.index === 'setting')
    settingShow.value = true
  // 生成分享链接
  if (item.index === 'share')
    fetchShareLink()
  // 重置
  if (item.index === 'reset')
    mainStore.resetAction()

  // 跳转外部链接
  if (item.index === 'externalLink' && item.link)
    window.open(item.link)
}
</script>

<template>
  <header class="nav-header reset-list-style">
    <nav class="nav flex justify-between items-center">
      <div class="nav-left">
        <router-link to="/" class="flex items-center">
          <img src="" alt="logo">
          <span class="title text-xl font-bold flex-1">游乐场</span>
        </router-link>
      </div>
      <ul class="nav-right flex items-center">
        <li v-for="(item, index) in navList" :key="index" class="nav-item">
          <a @click="onNavClick(item)">
            <span class="item-icon" :class="item.icon" />
            <span class="item-text">{{ item.text }}</span>
          </a>
        </li>
      </ul>
    </nav>
    <setting-drawer v-model="settingShow" />
  </header>
</template>

<style lang="scss" scoped>
.nav-header {
  height: 50px;
  position: relative;
  z-index: 100;
  padding: 11px 24px;
  background-color: var(--nav-header-bg);
  nav {
    height: 100%;
  }
  color: var(--base);
  .nav-left {
    a {
      text-decoration: none;
      color: var(--base);
    }
  }
  .nav-right a {
    text-decoration: none;
    display: flex;
    align-items: center;
    color: var(--nav-btn-color);
    padding: 0 2px;
    .item-icon {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
    &:hover {
      color: var(--highlight);
    }
  }
  box-shadow: 0 2px 8px var(--card-shadow);
  line-height: var(--navbar-line-height);
  white-space: nowrap;
}
.nav-left {
  img {
    background-color: pink;
    margin-right: 10px;
  }
}
.nav-right li {
  cursor: pointer;
  margin: 0 4px;
  position: relative;
}

// nav-item
.nav-item {

  .show-info {
    position: absolute;
    top: 40px;
    right: 0;
  }
}
</style>
