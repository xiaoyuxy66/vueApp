<template>
  <div class="home">
    <header class="g-headere-container">
      <home-header/>
    </header>
    <me-scroll 
      :dataObject='recommends' 
      pullDown
      pullUp
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMore"
    >
       <home-slider ref="slider"></home-slider>
       <home-nav></home-nav>
       <home-recommend @loaded="getCommends" ref="recommend"></home-recommend>
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
        recommends: []
      };
    },
    components: {
      HomeHeader,
      HomeSlider,
      MeScroll,
      HomeNav,
      HomeRecommend
    },
    methods: {
      // updateScroll(){

      // },
      getCommends(recommends) {
        this.recommends = recommends;
      },
      pullToRefresh(end){
        // setTimeout(() =>{
        //   console.log('下拉刷新');
        //   end();
        // },1000);
        this.$refs.slider.update().then(end);
      },
      pullToLoadMore(end){
        this.$refs.recommend.update().then(end).catch(err=>{
          console.log(err);
          end();
        });
      }
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
