import { createRouter, createWebHashHistory } from "vue-router";

import Home from './components/home-page/Home.vue'

const router =createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/login',component:Home},
    ]
    
})

export default router