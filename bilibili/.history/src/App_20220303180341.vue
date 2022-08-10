<template>
  <div>
    <el-button :icon="Search" circle></el-button>
  </div>
</template>

<script>
//导航栏组件
import HeadLine from "./components/home-page/HeadLine.vue";

export default {
  name: "MyApp",
  data() {},
  setup() {
    return {
      Search,
      Edit,
      Check,
      Message,
      Star,
      Delete,
    };
  },
  components: {
    HeadLine,
  },
};
</script>

<style lang="less" scoped>
</style>