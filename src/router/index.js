import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
    },
    {
        path: '/archive',
        name: 'Archive',
        component: () => import(/* webpackChunkName: "archive" */ '../views/Archive.vue')
    },
    {
        path: '/article/:id',
        name: 'Article',
        component: () => import(/* webpackChunkName: "article" */ '../views/Article.vue')
    },
    {
        path: '/book',
        name: 'Book',
        component: () => import(/* webpackChunkName: "book" */ '../views/Book.vue')
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/resume',
        name: 'Resume',
        component: () => import(/* webpackChunkName: "resume" */ '../views/Resume.vue')
    }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // 使用 createWebHistory 替代 Vue 2 的 'history' 模式
    routes
});

export default router;
