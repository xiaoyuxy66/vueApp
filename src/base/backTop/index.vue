<template>
  <transition name="mine-backTop">
    <a
      href="javascript:;"
      class="mine-backTop"
      v-show="visible"
      @click="backTop"
    >
      <i class="iconfont icon-backtop"></i>
    </a>
  </transition>
</template>
<script>
  export default {
    name: 'MeBackTop',
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      backTop() {
        this.$emit('backTop');
      }
    }
  };
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.mine-backTop{
  width: 45px;
  height: 45px;
  @include flex-center();
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  border: none;
  .iconfont {
      color: #fff;
      font-size: 38px;
    }
}
.mine-backTop{
  &-enter-active,
  &-leave-active{
    transition: opacity 0.4s;
  }
  &-enter,
  &-leave-to{
    opacity: 0;
  }
}
</style>
