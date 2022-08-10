import { createRouter, createWebHashHistory } from "vue-router";

import Home from './components/home-page/Home.vue'
import Login from './components/login/LoginIn.vue'
import News from './components/news/News.vue'

const router =createRouter({
    history:createWebHashHistory(),
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/login',component:Login},
        {path:'/news',component:News},
    ]
    
})

router.beforeEach((to,from,next)=>{
    const tokenStr=localStorage.getItem("token");
    if(to.path=='/news'&&!tokenStr)
    {
        
    }
})

export default router