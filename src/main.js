// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';
// require styles 报错可能是版本不对
import 'swiper/dist/css/swiper.css';

import 'assets/scss/index.scss'; // 解决移动端300ms延迟
import 'assets/js/rem';
fastclick.attach(document.body);
// 图片懒加载
Vue.use(VueLazyLoad, {
  preLoad: 1, // 还差多少加载，1为完全显示加载
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.gif'),
  attempt: 1 // 尝试加载几次
});

Vue.config.productionTip = false; ;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
