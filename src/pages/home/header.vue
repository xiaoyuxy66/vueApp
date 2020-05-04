<template>
<!--查看全局页面头部大同小异，可以抽出基础组件，用插槽solt-->
  <MeNavbar class="header" v-show="visible">
    <i class="iconfont icon-scan" slot="left"></i>
    <me-search-box 
      slot="center" 
      placeholder="开学季有礼，好货5折起" 
      fake
      @click.native="goToSearch"
    >
    <!--自定义组件用原声方法native-->
    </me-search-box>
    <i class="iconfont icon-msg" slot="right"></i>
  </MeNavbar>
</template>
<script>
  import MeNavbar from 'base/navbar';
  import MeSearchBox from 'base/search-box';
  export default {
    name: 'HomeHeader',
    data() {
      return {
        visible: true
      };
    },
    components: {
      MeNavbar,
      MeSearchBox
    },
    methods: {
      // 下拉时头部隐藏，背景变色
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      goToSearch(){
        this.$router.push('/search');
      }
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
   &.header-transition {
      background-color: $header-bgc-translucent;
    }
   .iconfont{
     color:$icon-color-default;
     font-size: $icon-font-size;
   }
 }
</style>
