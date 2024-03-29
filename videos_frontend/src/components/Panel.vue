<template>
  <div class="container">
    <div class="panel">
      <div class="blue-tag"></div>
      <div class="title">{{ title }}</div>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  title: String,
});
</script>

<style lang="less" scoped>
.container {
  margin: 40px;
}
.panel {
  margin-bottom: 40px;
  display: flex;
  align-items: center;
}
.title {
  font-size: 20px;
  line-height: 28px;
}
.blue-tag {
  margin-right: 10px;
  width: 5px;
  height: 20px;
  top: 10px;
  left: 10px;
  background-color: blue;
}
</style>
