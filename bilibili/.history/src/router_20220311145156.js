import { createRouter, createWebHashHistory } from "vue-router";

import MyApp from './App.vue'

const router =createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/home',component:MyApp},
    ]
    
})

export default router