import { createRouter, createWebHashHistory } from "vue-router";

import Home from './components/home-page/Home.vue'
import Login from './components/login/LoginIn.vue'

const router =createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/home',component:Home},
        {path:'/login',component:Login},
    ]
    
})

export default router