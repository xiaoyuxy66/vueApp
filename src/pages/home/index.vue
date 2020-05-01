<template>
  <div class="home">
    <header class="g-headere-container">
      <home-header/>
    </header>
    <me-scroll>
       <home-slider></home-slider>
       <home-nav></home-nav>
       <home-recommend></home-recommend>
    </me-scroll>

    <div class="g-backtop-container"></div>
  </div>
</template>
<script>
  import HomeHeader from './header'; // 本页面相关组件
  import HomeSlider from './slider';
  import MeScroll from 'base/scroll';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  export default {
    name: 'Home',
    data() {
      return {

      };
    },
    components: {
      HomeHeader,
      HomeSlider,
      MeScroll,
      HomeNav,
      HomeRecommend
    }
  };
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.home{
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: $bgc-theme;
}
</style>
