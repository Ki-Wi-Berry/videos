<template>
  <div>
    <el-button :icon="Search" circle></el-button>
    <!-- <head-line></head-line> -->
  </div>
</template>

<script>
//导航栏组件
import HeadLine from "./components/home-page/HeadLine.vue";
import {Search} from '@element-plus/icons-vue'
export default {
  name: "MyApp",
  data() {},
  setup() {
    return {
      Search,
    };
  },
  components: {
    HeadLine,
  },
};
</script>

<style lang="less" scoped>
</style>