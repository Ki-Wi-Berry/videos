<template>
  <router-view></router-view>
</template>

<script lang="ts" setup >
import { GetUsersInfo } from "./api/request";
import { useStore } from "./store";
import { storeToRefs } from "pinia";
const store = useStore();
// const  {islogin}  = storeToRefs(store);
GetUsersInfo({})?.then((res) => {
  // console.log(1);
  // console.log(res.data.message);
  if (res.data.status == 0) {
    store.loginIn();
    // localStorage.setItem("token", res.data.token);
  }else if (res.data.status == 403){
    localStorage.removeItem("token");
  }
});
</script>
