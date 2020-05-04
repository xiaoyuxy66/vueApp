<template>
  <div class="search-hot">
    <h4 class="search-hot-title">热门搜索</h4>
    <div class="loading-container">
      <me-loading v-if="!hotList.length"></me-loading>
      <ul v-else class="search-hot-list">
        <li 
          class="search-hot-item"
          v-for="(item,index) in hotList"
          :key="index"
          @click="$_search_selectItem(item.hotWord)"
        >{{item.hotWord}}</li>  
      </ul>
    </div>
  </div>
</template>
<script>
import MeLoading from 'base/loading';
import {getSearchHotList} from 'api/search';
import {searchMixin} from 'assets/js/mixins';
export default {
  name:'SearchHot',
  mixins:[searchMixin],
  data(){
    return{
      hotList:[]
    }
  },
  components:{
    MeLoading
  },
  created(){
    //加载完更新滚动条
    this.getHotList().then(()=>{
       this.$emit('loaded');
    });

  },
  methods:{
    getHotList(){
      return getSearchHotList().then(res=>{
        return new Promise(resolve=>{
          if(res){
            // console.log(res);
            this.hotList=res;
            resolve();
          }
        });

      });
    },

  }
}
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";
.search-hot{
  padding-left: 10px;
  background-color: #fff;
  border-bottom: 1px solid $border-color;
  margin-bottom: 10px;
  &-title{
    height: 34px;
    line-height: 34px;
    font-size: $font-size-l;
    font-weight: bold;
  }
  &-list{
    display: flex;
    flex-wrap: wrap;
  }
  &-item{
    padding: 8px;
    background-color: #f0f2f5;
    border-radius: 4px;
    margin: 0 10px 10px 0;
    color: #686868;
  }
  .loading-container {
    padding: 10px 0;
  }
}
</style>