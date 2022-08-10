import { createRouter, createWebHashHistory } from "vue-router";

import Home from './App.vue'

const router =createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/home',}
    ]
})