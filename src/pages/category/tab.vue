<template>
  <me-scroll :scrollbar="false">
    <ul class="category-tab">
      <li
        class="category-tab-item"
        :class="{'category-tab-item-active':item.id===curId}"
        v-for="item in items"
        :key="item.id"
        @click="switchTab(item.id)"
      >{{item.name}}</li>
    </ul>
  </me-scroll>
</template>
<script>
  import MeScroll from 'base/scroll';
  import {categoryNames} from './config';
  export default {
    name: 'CategoryTab',
    components: {
      MeScroll
    },
    data() {
      return {
        curId: ''
      };
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.items = categoryNames; // 不需要变化的数据不用放到data里面
        this.switchTab(this.items[0].id);// 默认一进来选中第一个
      },
      switchTab(id) {
        if (id === this.curId) {
          return;
        }
        this.curId = id;
        // 触发切换tab方法
        this.$emit('switch-tab', id);
      }
    }
  };
</script>
<style lang="scss" scoped>
@import "~assets/scss/mixins";

  $tab-item-height: 46px;
  .category-tab{
    width: 100%;
    &-item{
      height: $tab-item-height;
      border-bottom:1px solid $border-color;
      border-right:1px solid $border-color;
      color: #080808;
      background-color: #fff;
      font-size: $font-size-l;
      font-weight: bold;
      text-align: center;
      line-height: $tab-item-height;
      @include ellipsis();
    }
    &-item-active {
      background: none;
      border-right: none;
      color: #f23030;
    }
  }
</style>
