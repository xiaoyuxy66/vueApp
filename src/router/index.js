import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import('pages/home'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('pages/cart'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('pages/category'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    name: 'personal',
    path: '/personal',
    component: () => import('pages/personal'),
    meta: {
      keepAlive: true // 需要被缓存
    }
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('pages/search'),
    meta: {
      keepAlive: true // 需要被缓存
    }
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
