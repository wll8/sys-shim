<script lang="ts" setup>
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import useSettingStore from '@/store/setting/setting'
import type { ISettingInfo } from '@/store/setting/setting'
import { useTheme } from '@/hooks/useTheme'

interface IProps {
  modelValue?: boolean
}
defineProps<IProps>()

const emit = defineEmits(['update:modelValue'])
const settingStore = useSettingStore()
const formState = reactive<ISettingInfo>({
  ws: '',
  nodeV: '',
  browserV: '',
  appV: '',
  styleMode: 'light',
  logMode: 'detailed',
})

const { styleModeOptions, logModeOptions, versionOptions } = storeToRefs(settingStore)
// 初始化formState的值
function initFormStateValue() {
  const settingInfo = settingStore.settingInfo
  const keys = Object.keys(settingInfo) as (keyof ISettingInfo)[]
  for (const key of keys)
    (formState[key] as any) = settingInfo[key]
}

// 改变抽屉是否展开值
function changeModelValue(value: boolean) {
  emit('update:modelValue', value)
}
// 初始化formState的值
initFormStateValue()
// 设置背景主题
const { toggleDark } = useTheme()
// 设置选择版本
function onConfirm() {
  // 关闭模态框
  changeModelValue(false)
  // 设置背景风格
  formState.styleMode === 'dark' ? toggleDark(true) : toggleDark(false)
  // 设置数据
  settingStore.changeSettingInfoAction(formState)
}
</script>

<template>
  <div class="setting-drawer">
    <a-drawer
      :open="modelValue"
      class="custom-class"
      root-class-name="root-class-name"
      title="设置"
      placement="right"
      width="500"
      @close="changeModelValue(false)"
    >
      <div class="content">
        <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 18 }"
          autocomplete="off"
        >
          <a-form-item
            label="连接"
            name="ws"
          >
            <a-input v-model:value="formState.ws" />
          </a-form-item>
          <a-form-item
            label="node版本"
            name="nodeV"
          >
            <a-select v-model:value="formState.nodeV" :options="versionOptions.node" />
          </a-form-item>
          <a-form-item
            label="browser版本"
            name="browserV"
          >
            <a-select v-model:value="formState.browserV" :options="versionOptions.browser" />
          </a-form-item>
          <a-form-item
            label="app版本"
            name="appV"
          >
            <a-select v-model:value="formState.appV" :options="versionOptions.app" />
          </a-form-item>
          <a-form-item
            label="风格"
            name="styleMode"
          >
            <a-radio-group v-model:value="formState.styleMode">
              <a-radio v-for="(item, index) in styleModeOptions" :key="index" :value="item.value">
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item
            label="日志"
            name="logMode"
          >
            <a-radio-group v-model:value="formState.logMode">
              <a-radio v-for="(item, index) in logModeOptions" :key="index" :value="item.value">
                {{ item.label }}
              </a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
      <footer class="setting-footer">
        <a-button @click="changeModelValue(false)">
          取消
        </a-button>
        <a-button class="confirm-btn" type="primary" @click="onConfirm">
          确认
        </a-button>
      </footer>
    </a-drawer>
  </div>
</template>

<style lang="scss" scoped>
.setting-drawer {
  background: var(--bg);
}
.setting-footer {
  position: absolute;
  right: 20px;
  bottom: 40px;

  .confirm-btn {
    margin-left: 10px;
  }
}
</style>
