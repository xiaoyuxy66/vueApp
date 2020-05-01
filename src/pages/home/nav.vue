<template>
  <nav class="nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item,index) in navItemList" :key="index">
        <a class="nav-link" :href="item.linkUrl">
           <img class="nav-pic" alt='' :src="item.picUrl"/>
           <span>{{item.text}}</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
  import {navItems} from './config';
  export default {
    name: 'HomeNav',
    created() {
      this.navItemList = navItems; // 不需要响应数据变化的变量可以不放在data里面
    }
  };
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.nav{
  width: 100%;
  background-color: #fff;
  padding-top: 15px;
  &-list{
    display: flex;
    flex-wrap: wrap;
    .nav-item{
      margin-bottom: 15px;
      width: 20%;
    }
    .nav-link{
      @include flex-center(column);
    }
    .nav-pic{
      width: 60%;
      margin-bottom: 6px;
    }
  }
}
</style>
