<template>
  <div class="mine-loading" :class="{'mine-loading-inline':inline}">
    <!-- <slot></slot>  可以自己定义图片-->
    <span class="mine-loading-indicator" v-if="indicator==='on'">
      <slot><img src="./loading.gif" alt='loading'/></slot>
    </span>
    <span class="mine-loading-text" v-if="loadingText">{{loadingText}}</span>
  </div>
</template>
<script>
  export default {
    name: 'MeLoading',
    props: {
      indicator: {
        type: String,
        default: 'on',
        validator(value) {
          return ['on', 'off'].indexOf(value) > -1;
        }
      },
      text: {
        type: String,
        default: '加载中...'
      },
      inline: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        loadingText: this.text
      };
    },
    watch: {
      // cityName(newName, oldName) {},
      text(text) {
        this.loadingText = text;
      }
    },
    methods: {
      setText(text) {
        this.loadingText = text;
      }
    }
  };
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.mine-loading{
  overflow: hidden;
  width: 100%;
  height: 100%;
  @include flex-center(column);
  &-inline{
    flex-direction: row;
  }
  .mine-loading-text{
    margin-top: 5px;
  }
  .mine-loading-indicator ~ .mine-loading-text {
    margin-top: 0;
    margin-left: 6px;
  }
}
</style>
