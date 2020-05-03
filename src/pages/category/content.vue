<template>
  <div class="category-content">
    <div class="loading-container" v-if="isLoading">
      <!-- <me-loading/> -->
      <div class="loading-wrapper">
        <me-loading/>
      </div>
    </div>
    <me-scroll ref="scroll">
      <div class="content">
        <div class="pic" v-if="contentList.banner">
          <a :href="contentList.banner.linkUrl" class="pic-link">
            <!--vue如何在一个div块里面的img都加载完成后执行某函数-->
            <img @load="updateScroll" :src="contentList.banner.picUrl" alt="" class="pic-img"/>
          </a>
        </div>
        <section class="section" v-for="(item,index) in contentList.data" :key="index">
          <h4 class="section-title">{{item.name}}</h4>
          <ul class="section-list">
            <li class="section-item" v-for="(itemChild,i) in item.itemList" :key="i">
              <a class="section-link" :href="itemChild.linkUrl">
                <p class="section-pic"><img :src="itemChild.picUrl"/></p>
                <p class="section-name">{{itemChild.name}}</p>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </me-scroll>
  </div>
</template>
<script>
  import MeScroll from 'base/scroll';
  import MeLoading from 'base/loading';
  import {getCategoryContent} from 'api/category';
  //对于经常不变的数据可以用本地缓存，设置多长时间内用缓存数据
  import storage from 'assets/js/storage';
  import {CATEGORY_CONTENT_KEY, CATEGORY_CONTENT_UPDATE_TIME_INTERVAL} from './config';
  export default {
    name: 'CategoryContent',
    components: {
      MeScroll,
      MeLoading
    },
    data(){
      return{
        contentList:[],
        isLoading:true
      }
    },
    props:{
      curId:{
        type:String,
        default:''
      }
    },
    watch:{
      curId(id){
        this.isLoading=true;
        //这里要用promise所以getContent要返回promise
        this.getContent(id).then(()=>{
          this.isLoading=false;
          this.backToTop();
        });
      }
    },
    methods:{
      getContent(id){
        //首先判断storage中是否有数据，是否过期
        let contents=storage.get(CATEGORY_CONTENT_KEY);
        let updateTime;
        let curTime=new Date().getTime(); //此时时间戳

        if(contents&&contents[id]){
          updateTime=contents[id].updateTime;
          //没过期
          if(curTime-updateTime<CATEGORY_CONTENT_UPDATE_TIME_INTERVAL){
            return this.getContentByLocalStorage(contents[id]);
          }else{ //HTTP
            return this.getContentByHTTP(id).then(() => {
              this.updateLocalStorage(contents, id, curTime);
            });
          }
        }else{ //HTTP
          return this.getContentByHTTP(id).then(() => {
              this.updateLocalStorage(contents, id, curTime);
          });
        }
  
      },
      //LocalStorageq取数据
      getContentByLocalStorage(data){
        this.contentList=data.data;
        return Promise.resolve();
      },
      //HTTP
      getContentByHTTP(id){
        return getCategoryContent(id).then(res=>{
          return new Promise(resolve=>{
            if(res){
              this.contentList=res;
              resolve();
              //this.isLoading=false; 不能这么写，耦合性太强，应该放在then方法中
            }
          });
        });
      },
      //更新Storage
      updateLocalStorage(contents, id, curTime){
        contents=contents||{};
        contents[id]={};
        contents[id].data = this.contentList;
        console.log(contents)
        contents[id].updateTime = curTime;
        storage.set(CATEGORY_CONTENT_KEY, contents);
        console.log(storage.get(CATEGORY_CONTENT_KEY));
      },
      updateScroll(){
         // 也是由于异步加载的问题，因为小图片在加载之前已经算出来的高度，但是顶部的banner没有高度，所以滚动条不能用了，需要加载完更新
         this.$refs.scroll&&this.$refs.scroll.update();
      },
      //返回顶部
      backToTop(speed){
         this.$refs.scroll&&this.$refs.scroll.scrollToTop(0);
      }

    }
  };
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.category-content{
  width: 100%;
  height: 100%;
  position: relative;
  .loading-container{
    position: absolute;
    top:0;
    left:0;
    width:100%;
    height: 100%;
    z-index: $category-popup-z-index;
    @include flex-center();
    .mine-loading {
      color: #fff;
      font-size: 14px;
    }
    .loading-wrapper {
      width: 50%;
      padding: 30px 0;
      background-color: $modal-bgc;
      border-radius: 4px;
    }
  }

  .content{
    padding: 10px;
    .pic{
      margin-bottom: 12px;
      &-link{
        display: block;
      }
      &-img{
        width: 100%;
      }
    }
    .section{
      margin-bottom: 12px;
      &:last-child{
        margin-bottom: 0;
      }
      &-title{
        height: 28px;
        line-height: 28px;
        color: #080808;
        font-weight: bold;
      }
      &-list{
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        padding: 10px 10px 0;
      }
      &-item{
        width:calc(100%/3);
      }
      &-link{
        display: block;
      }
      &-pic{
        width: 80%;
        padding-top: 80%;
        position: relative;
        margin: 0 auto;
        img{
          position: absolute;
          top:0;
          left:0;
          width: 100%;
          height: 100%;
        }
      }
      &-name {
        height: 36px;
        line-height: 36px;
        text-align: center;
        @include ellipsis();
      }
    }
  }
}
</style>
