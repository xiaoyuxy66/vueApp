<template>
  <div class="home">
    <header class="g-headere-container">
      <home-header :class="{'header-transition':isHeaderTransition}" ref="header"/>
    </header>
    <me-scroll
      ref="scroll"
      :dataObject='recommends'
      pullDown
      pullUp
      @pull-down="pullToRefresh"
      @pull-up="pullToLoadMore"
      @scroll-end="scrollEnd"
      @scroll="scroll"
      @pull-down-transition-end="pullDownTransitionEnd"
    >
       <home-slider ref="slider"></home-slider>
       <home-nav></home-nav>
       <home-recommend @loaded="getCommends" ref="recommend"></home-recommend>
    </me-scroll>
    <div class="g-backtop-container">
      <me-back-top :visible="isBacktopVisible" @backTop="backTop"></me-back-top>
    </div>
  </div>
</template>
<script>
  import HomeHeader from './header'; // 本页面相关组件
  import HomeSlider from './slider';
  import MeScroll from 'base/scroll';
  import HomeNav from './nav';
  import HomeRecommend from './recommend';
  import MeBackTop from 'base/backTop';
  import {HEADER_TRANSITION_HEIGHT} from './config';
  export default {
    name: 'Home',
    data() {
      return {
        recommends: [], // 热销推荐
        isBacktopVisible: false, // 是否显示返回顶部
        isHeaderTransition: false // 头部背景样式
      };
    },
    components: {
      HomeHeader,
      HomeSlider,
      MeScroll,
      HomeNav,
      HomeRecommend,
      MeBackTop
    },
    // created(){
    //   setTimeout(()=>{
    //     this.isBacktopVisible=true;
    //   },1000);
    // },
    methods: {
      // updateScroll(){

      // },
      getCommends(recommends) {
        this.recommends = recommends;
      },
      pullToRefresh(end) {
        // setTimeout(() =>{
        //   console.log('下拉刷新');
        //   end();
        // },1000);
        this.$refs.slider.update().then(end);
      },
      // 上拉加载
      pullToLoadMore(end) {
        this.$refs.recommend.update().then(end).catch(err => {
          console.log(err);
          end();
        });
      },

      // 监控手指在屏幕上时（这个组件做滚动条恶心死了）
      scroll(translate) {
        this.changeHeaderStatus(translate);
      },

      // 滚动结束
      scrollEnd(translate, swiper, pulling) {
        // 在结束时需要在触发一次(特别恶心，因为监控不到0，只有在加载结束时执行)
        if (!pulling) {
          this.changeHeaderStatus(translate);
        }
        // 满足向下滚动并且距离超过一屏。translate < 0为下拉
        this.isBacktopVisible = translate < 0 && -translate > swiper.height;
      },
      // 下拉加载完之后 头部出现
      pullDownTransitionEnd() {
        this.$refs.header.show();
      },
      // 返回顶部
      backTop() {
        this.$refs.scroll && this.$refs.scroll.scrollToTop();
      },
      // 改变头部样式
      changeHeaderStatus(translate) {
        // 上拉
        if (translate > 0) {
          this.$refs.header.hide(); // 头部隐藏
          return;
        }
        this.$refs.header.show(); // 如果下拉头部出现

        // 下拉的距离到达指定高度，头部背景不再透明
        this.isHeaderTransition = -translate > HEADER_TRANSITION_HEIGHT;
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
