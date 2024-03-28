<script lang="ts" setup>
import { valueToSize } from './utils/index.ts'

interface IProps {
  width?: number | string
  height?: number | string
}
withDefaults(
  defineProps<IProps>(),
  {
    width: 12,
    height: 12,
  },
)
</script>

<template>
  <svg
    t="1711596786500"
    class="icon" viewBox="0 0 1024 1024"
    version="1.1" xmlns="http://www.w3.org/2000/svg"
    p-id="7240"
    :style="{ width: valueToSize(width), height: valueToSize(height) }"
  >
    <path
      d="M383.23 271.53c-25.16 1.294-32.855 23.49-33.79 44.95l-0.9 0.73s2.192 408.877 3.43 412.14c10.237 27.506 40.219 27.511 61.65 15.53l0.56 0.22s345.098-199.46 347.91-201.71c18.281-15.019 35.094-36.958 8.6-60.47 0 0-372.092-210.038-375.58-210.6-4.338-0.731-8.286-0.975-11.88-0.79z" p-id="7241" fill="#707070"
    /></svg>
</template>
