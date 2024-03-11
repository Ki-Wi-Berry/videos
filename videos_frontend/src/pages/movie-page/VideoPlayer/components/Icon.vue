
<template>
  <i class="icon iconfont" :class="icon" :style="iconSize"></i>
</template>
<script>

export default {
  name: "icon"
}
</script>
<script setup>
import { computed } from 'vue'
// const emits = defineEmits('click')
const props = defineProps({
  icon: String,
  size: [Number, String],
})
const iconSize = computed(() => {
  let size = /^\d+$/.test(props.size) ? props.size + "px" : props.size
  return { fontSize: size };
})

</script>
<style lang = "less" scoped >
@import '../style/iconfont.css';
.icon {
  display: inline-block;
  cursor: pointer;
  overflow: hidden;
}

</style>
