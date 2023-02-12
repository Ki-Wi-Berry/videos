import { createRouter, createWebHashHistory } from "vue-router";

import Home from './components/home-page/Home.vue'
import Login from './components/login/LoginIn.vue'
import News from './components/news/News.vue'
import Movie from './components/movie-page/MoviePage.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/movie' },
        { path: '/home', component: Home },
        { path: '/login', component: Login },
        { path: '/news', component: News },
        { path: '/movie', component: Movie },
    ]

})

router.beforeEach((to, from, next) => {
    const tokenStr = localStorage.getItem("token");
    if (to.path == '/news' && !tokenStr) {
        next("/login");
    } else if (to.path == '/login' && tokenStr) {
        next(false);
    }else if (to.path == from.path) {
        next(false);
    }else {
        next();
    }
})

export default router

