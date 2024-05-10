<script src="./App.js"></script>

<template>
  <div>
    <div>sys-shim</div>
    <button v-for="(item, index) in list" :key="index" @click="item.fn">
      {{ item.name }}
    </button>
    <hr />
    <Run />
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
