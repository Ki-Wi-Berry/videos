<template>
  <router-view></router-view>
</template>

<script setup name= "MyApp">
import {GetUsersInfo} from "./api/LoginIn"
GetUsersInfo().then((res,))


</script>
