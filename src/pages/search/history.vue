<template>
  <div class="search-history" v-if="historys.length">
     <h4 class="search-history-title">热门搜索</h4>
     <!--这里在结果页也用同样样式-->
     <transition-group tag="ul" name="list" class="g-list">
       <li 
        class="g-list-item" 
        @click="$_search_selectItem(item)"
        v-for="(item,index) in historys"
        :key="index"
       >
         <span class="g-list-text">{{item}}</span>
         <!--阻止事件冒泡-->
         <i class="iconfont icon-delete" @click.stop="removeItem(item)"></i>
       </li>
     </transition-group>
     <a href="javascript:;" class="search-history-btn" @click="showConfirm">
       <i class="iconfont icon-clear"></i>
       清空历史搜索
     </a>
  </div>
</template>
<script>
import storage from 'assets/js/storage';
import {SEARCH_HISTORY_KEYWORD_KEY} from './config';
import {searchMixin} from 'assets/js/mixins';
export default {
  name:'SearchHistory',
  mixins:[searchMixin],
  data(){
    return{
      historys:[]
    }
  },
  created(){
    this.getHistory();
  },
  methods:{
    showConfirm(){
      //弹出弹框
      this.$emit("show-confirm");
    },
    getHistory(){
      this.historys=storage.get(SEARCH_HISTORY_KEYWORD_KEY,[]);
    },
    removeItem(item){
      this.historys=this.historys.filter(val=>val!==item);
      storage.set(SEARCH_HISTORY_KEYWORD_KEY,this.historys);
      //更新滚动条 删除有动画100ms
      setTimeout(()=>{
        this.$emit('remove-item,item');
      },100);
    },
    clear(){
      storage.remove(SEARCH_HISTORY_KEYWORD_KEY);
    },
    update(){
      this.getHistory();
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

.search-history{
  padding-bottom: 30px;
  background-color: #fff;
  &-title {
    height: 34px;
    line-height: 34px;
    padding: 0 10px;
    font-size: $font-size-l;
    font-weight: bold;
  }
  &-btn {
    @include flex-center();
    width: 80%;
    height: 40px;
    background: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 0 auto;
    color: #686868;

    .iconfont {
      margin-right: 5px;
    }
  }
  .list {
    &-enter-active,
    &-leave-active {
      transition: height 0.1s;
    }

    &-enter,
    &-leave-to {
      height: 0;
    }
  }
}
</style>