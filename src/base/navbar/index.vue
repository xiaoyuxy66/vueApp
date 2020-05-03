<template>
  <div class="mine-navbar">
    <div class="mine-navbar-left" v-if="$slots.left">
      <slot name="left"></slot>
    </div>
    <div class="mine-navbar-center" v-if="$slots.center">
      <slot name="center"></slot>
    </div>
    <div class="mine-navbar-right" v-if="$slots.right">
      <slot name="right"></slot>
    </div>
    <!--只有文案的标题-->
    <h1 class="mine-navbar-title" v-if="title">
      <span v-text="title"></span>
    </h1>
  </div>
</template>
<script>
  export default {
    name: 'MeNavbar',
    data() {
      return {

      };
    },
    created() {
      console.log(this.title);
    },
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  };
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.mine-navbar{
  position: relative;
  @include flex-between();
  height: $navbar-height;
  background-color: #fff;
  &-left{
    margin-left: 10px;
    ~.mine-navbar-right{
      position: static; //如果不止右边图标就不是绝对顶对，巧用所有弟弟选择器
    }
  }
  &-center{
    flex: 1;
    margin-left: 10px;
    margin-right: 10px;
    // text-align: center;
    ~.mine-navbar-right{
      position: static; //如果不止右边图标就不是绝对顶对，巧用所有弟弟选择器
    }
  }
  &-right{
    margin-right: 10px;
    //只有右边的按钮
    position: absolute;
    right: 0;
    @include flex-center();
    height:100%;
  }
  &-title{
    position: absolute;
    left: 20%;
    right: 20%;
    @include flex-center();
    top:0;
    bottom:0;
    //line-height: 1.5;
    text-align: center;
    span{
      width: 100%;
      font-size: 18px;
      @include ellipsis();
      text-align: center;
      line-height: 1.5; //为了文字下方不被截取掉
    }
  }
}
</style>
