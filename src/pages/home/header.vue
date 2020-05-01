<template>
<!--查看全局页面头部大同小异，可以抽出基础组件，用插槽solt-->
  <MeNavbar class="header" title="搜索也搜索也搜索也">
    <i class="iconfont icon-scan" slot="left"></i>
    <div>搜索狂</div>
    <i class="iconfont icon-msg" slot="right"></i>
  </MeNavbar>
</template>
<script>
  import MeNavbar from 'base/navbar';
  export default {
    name: 'HomeHeader',
    data() {
      return {

      };
    },
    components: {
      MeNavbar
    }

  };
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
 .header{
   &.mine-navbar{
     background-color: transparent;
    // background-color: $header-bgc-translucent;
   }
   .iconfont{
     color:$icon-color-default;
     font-size: $icon-font-size;
   }
 }
</style>
