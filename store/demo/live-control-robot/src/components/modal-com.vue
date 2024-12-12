<template>
  <div>
    <!-- 弹窗结构 -->
    <teleport to="body">
      <div v-if="modelValue" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
          <pre whitespace-pre-wrap v-html="text"></pre>
          <div class="modal-actions">
            <button @click="agree">同意</button>
            <button @click="disagree">不同意</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, watch } from 'vue'

const text = `
<h2>使用者协议</h2>
你打开了本程序，即作为本程序的使用者，请阅读以下条款：

本程序仅用于内部研究和学习使用，请24小时内删除。

使用者不可将本程序用于任何盈利行为、非法用途、不可传播。

假设使用者非法使用本程序，造成的任何后果或法律责任，由使用者自行承担。

如果你点击“同意”，则表示你认可和接受以上内容。点击“不同意”则退出此程序。
`.trim()

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([`update:modelValue`])

const closeModal = () => {
  emit(`update:modelValue`, false)
}

const agree = () => {
  console.log(`用户同意协议`)
  closeModal()
}

const disagree = async () => {
  console.log(`用户不同意协议`)
  await globalThis.shim.nativeMain.G.killAll()
}

// 监听 modelValue 的变化来控制弹窗的显示
watch(
  () => props.modelValue,
  (newValue) => {
    if (!newValue) {
      // 当 modelValue 为 false 时，关闭弹窗
      closeModal()
    }
  },
)
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 50%;
  max-width: 600px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

button {
  margin-left: 10px;
}
</style>
