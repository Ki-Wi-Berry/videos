<template>
  <router-view></router-view>
</template>

<script setup name= "MyApp">
import {GetUsersInfo} from "./api/LoginIn"
GetUsersInfo({}).then((res=>{
  // console.log(1);
  // console.log(res.data.status);
  if(res.data.status==0)
  {
store.islogin = 1;
            localStorage.setItem("token",res.data.token);
  }else{

  }
  
}))


</script>
