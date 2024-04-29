<script src="./App.js"></script>

<template>
  <div>
    <div>sys-shim</div>
    <button v-for="(item, index) in list" :key="index" @click="item.fn">
      {{ item.name }}
    </button>
    <hr />
    <textarea
      @keydown.ctrl.e.prevent="runCode"
      v-model="code"
      placeholder="ctrl+e 运行">
    </textarea>
    <br />
    <button @click="runCode">运行代码</button>

  </div>
</template>

<style scoped>
textarea {
  width: 100%;
  min-height: 10em;
  resize: vertical;
  box-sizing: border-box;
}
</style>
