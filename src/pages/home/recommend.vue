<template>
  <div class="recommend">
    <div class="recommend-title">热卖推荐</div>
    <div class="recommend-loadding-container" v-if="!recommends.length">
       <me-loading :inline="true"></me-loading>
    </div>
    <ul class="recommend-list" v-else>
      <li class="recommend-item" v-for="(item,index) in recommends" :key="index">
        <router-link 
          class="recommend-link" 
          :to="{name: 'home-product',params: {id: item.baseinfo.itemId}}"
        >
          <p class="recommend-pic"><img :src="item.baseinfo.picUrlNew"/></p>
          <p class="recommend-name">{{item.name.shortName}}</p>
          <p class="recommend-origPrice"><del>¥{{item.price.origPrice}}</del></p>
          <p class="recommend-info">
            <span class="recommend-price">¥<strong>{{item.price.actPrice}}</strong></span>
            <span class="recommend-count">{{item.remind.soldCount}}件已售</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import { getHomeRecommend } from 'api/home';
import MeLoading from 'base/loading';
export default {
  name:'HomeRecommend',
  components:{
    MeLoading
  },
  data(){
    return{
      recommends:[],
      curPage:1,
      totalPage:1
    }
  },
  created(){
    this.getRecommend();
  },
  methods:{
    getRecommend(){
      if(this.curPage>this.totalPage){
        return;
      }
      return getHomeRecommend(this.curPage).then(res=>{
        if(res){
          this.curPage++;
          this.totalPage = res.totalPage;
          //this.recommends=this.recommends.concat(res.itemList);
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.recommend{
  &-title{
    width:100%;
    position: relative;
    padding: 10px 0;
    font-size: 14px;
    text-align: center;
    &:after,&:before{
      content: '';
      display: block;
      position: absolute;
      top:50%;
      width: 40%;
      height:1px;
      background-color: #ddd;
    }
    &:before{
      left: 0;
    }
    &:after{
      right: 0;
    }
  }
  &-list{
    @include flex-between();
    flex-wrap: wrap;
  }
  &-item{
    width: 49%;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
    margin-bottom: 8px;
  }
  &-link{
   display: block;
  }
  &-pic{
    width: 100%;
    padding-top: 100%; //巧用 让图片是正方形
    position: relative;
    margin-bottom: 6px;
    img{
      width: 100%;
      height: 100%;
      position: absolute;
      top:0;
      left: 0;
    }
  }
  &-name{
    height: 36px;
    padding: 0 5px;
    margin-bottom: 8px;
    line-height: 1.5;
    @include multiline-ellipsis();
  }
  &-origPrice {
    padding: 0 5px;
    margin-bottom: 8px;
    color: #ccc;
  }
  &-info {
    @include flex-between();
    padding: 0 5px;
    margin-bottom: 8px;
  }
  &-price {
    color: #e61414;
    strong{
      font-size: 20px;
    }
  }

  &-count {
    color: #999;
  }
}
.recommend-loadding-container{
  width: 100%;
  padding-top:100px;
}
</style>