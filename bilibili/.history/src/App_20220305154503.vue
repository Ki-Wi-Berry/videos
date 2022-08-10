<template>
  <div>
    <el-button :icon="Search"></el-button>
    <!-- <head-line></head-line> -->
  </div>
</template>

<script>
//导航栏组件
import HeadLine from "./components/home-page/HeadLine.vue";
import { Search } from "@element-plus/icons-vue";
export default {
  name: "MyApp",
  components: {
    HeadLine,
  },
  setup() {
    return {
      Search,
    };
  },
  
};
</script>

<style lang="less" scoped>
</style>