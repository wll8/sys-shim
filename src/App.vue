<script src="./App.js"></script>

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
