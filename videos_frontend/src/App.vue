<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { GetUsersInfo } from "./api/request";
import { useStore } from "./store";
import { storeToRefs } from "pinia";
const store = useStore();
// const  {isLogin}  = storeToRefs(store);
GetUsersInfo({})?.then((res) => {
  // console.log(1);
  console.log(res);
  store.loginIn();
  // localStorage.setItem("token", res.data.token);
});
</script>
