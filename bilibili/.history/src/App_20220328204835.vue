<template>
  <router-view></router-view>
</template>

<script setup name= "MyApp">
import {GetUsersInfo} from "./api/LoginIn"
GetUsersInfo({}).then((res=>{
  console.log(1);
  // console.log(res.data.status);
},err=>{
  // console.log(err);
  console.log(2);
}))


</script>
