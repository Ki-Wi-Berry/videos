<template>
  <router-view></router-view>
</template>

<script setup name= "MyApp">
import { GetUsersInfo } from "./api/LoginIn";
import { useStore } from "../store.js";
import { storeToRefs } from "pinia";
const store = useStore();
const  {islogin}  = storeToRefs(store);
GetUsersInfo({}).then((res) => {
  // console.log(1);
  // console.log(res.data.message);
  if (res.data.status == 0) {
    store.loginIn();
    // localStorage.setItem("token", res.data.token);
  }else if (res.data.status == 403){
    localStorage.removeItem("token", res.data.token);
  }
});
</script>
