import { createRouter, createWebHistory } from "vue-router";

import Home from "./pages/Home/Home.vue";
import Login from "./pages/Login";
import News from "./pages/news/News.vue";
import Movie from "./pages/MoviePage/MoviePage.vue";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Mine from "./pages/Mine";
import Search from "./pages/Search";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/news", component: News },
    { path: "/movie/:movieId", component: Movie },
    { path: "/upload", component: Upload },
    { path: "/mine", component: Mine },
    { path: "/search", component: Search, name: "search" },
  ],
});

// router.beforeEach((to, from, next) => {
//     const tokenStr = localStorage.getItem("token");
//     if (to.path == '/upload' && !tokenStr) {
//         next("/login");
//     } else if (to.path == '/login' && tokenStr) {
//         // next(false);
//         next();
//     }else if (to.path == from.path) {
//         next();
//     }else {
//         next();
//     }
// })

export default router;
