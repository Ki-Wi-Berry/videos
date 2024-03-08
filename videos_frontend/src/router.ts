import { createRouter, createWebHashHistory } from "vue-router";

import Home from './pages/home-page/Home.vue'
import Login from './pages/login'
import News from './pages/news/News.vue'
import Movie from './pages/movie-page/MoviePage.vue'
import Register from './pages/Register'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', redirect: '/movie' },
        { path: '/home', component: Home },
        { path: '/login', component: Login },
        { path: '/register', component: Register },
        { path: '/news', component: News },
        { path: '/movie', component: Movie },
    ]

})

router.beforeEach((to, from, next) => {
    const tokenStr = localStorage.getItem("token");
    if (to.path == '/news' && !tokenStr) {
        next("/login");
    } else if (to.path == '/login' && tokenStr) {
        // next(false);
        next();
    }else if (to.path == from.path) {
        next();
    }else {
        next();
    }
})

export default router

