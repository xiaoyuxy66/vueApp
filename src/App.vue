<template>
<!--页面级文件主要是给组件提供位置的容器-->
  <div id="app" class="g-container">
    <!--页面展示区，只有这里可以滚动-->
    <div class="g-view-container">
      <!--keep-alive保存在内存中，tab切换时-->
      <keep-alive  v-if="$route.meta.keepAlive">
        <router-view/>
      </keep-alive>
    </div>
    <div class="g-footer-container">
      <Tabbar/>
    </div>
  </div>
</template>

<script>
  import Tabbar from 'components/tabbar/index.vue';
  export default {
    name: 'App',
    components: {
      Tabbar
    }
  };
</script>
