import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import('pages/home')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('pages/cart')
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('pages/category')
  },
  {
    name: 'personal',
    path: '/personal',
    component: () => import('pages/personal')
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('pages/search')
  },
  // 匹配不到地址跳到home页
  {
    path: '*',
    redirect: '/home'
  }
];

export default new Router({
  routes
});
