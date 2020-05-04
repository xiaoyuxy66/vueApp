<template>
  <transition name="search">
    <div class="search">
      <header class="g-header-container">
        <search-header @query="getQuery"></search-header>
      </header>
      <div class="g-content-container">
        <me-scroll ref="scroll">
          <search-hot @loaded="updateScroll" v-show="!query"></search-hot>
          <search-history 
            ref="history"
            @remove-item="updateScroll" 
            @show-confirm="showConfirm"
            v-show="!query"
          ></search-history>
          <search-result :query="query" v-show="query"></search-result>
        </me-scroll>
      </div>
      <me-confirm
        msg="确定要清空吗？"
        ref="confirm"
        @confirm="clearAllSearchHistorys"
      ></me-confirm>
    </div>
  </transition>
</template>
<script>
import SearchHot from './hot';
import SearchHistory from './history';
import SearchResult from './result';
import SearchHeader from './header';
import MeScroll from 'base/scroll';
import MeConfirm from 'base/confirm';
  export default {
    name: 'Search',
    components:{
      SearchHot,
      SearchHistory,
      SearchResult,
      SearchHeader,
      MeScroll,
      MeConfirm
    },
    data() {
      return {
        query:''
      };
    },
    methods:{
      getQuery(val){
        this.query=val;
      },
      updateScroll(){
        this.$refs.scroll&&this.$refs.scroll.update();
      },
      showConfirm(){
        //调出弹框
        this.$refs.confirm&& this.$refs.confirm.show();
      },
      clearAllSearchHistorys(){
         this.$refs.history.clear(); //删除历史记录
         this.$refs.history.update(); //更新缓存
      }
    }
  };
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.search{
  height: 100%;
  width: 100%;
  background-color: $bgc-theme;
}
//实现切换动画
.search-active-leave,.search-enter-active{
  transition: all 0.3s;
}
.search-leave-to,.search-enter{
  transform: translate3d(100%,0,0);
}
.g-content-container{
  padding-top: 0;
}
</style>
