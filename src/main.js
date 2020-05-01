// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import fastclick from 'fastclick';
// require styles 报错可能是版本不对
import 'swiper/dist/css/swiper.css';

import 'assets/scss/index.scss'; // 解决移动端300ms延迟
import 'assets/js/rem';
fastclick.attach(document.body);

Vue.config.productionTip = false; ;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
