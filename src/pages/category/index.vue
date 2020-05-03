<template>
  <div class="category">
    <header class="g-headere-container">
      <home-header></home-header>
    </header>
    <div class="g-content-container">
      <div class="sidebar">
        <category-tab @switch-tab="switchTab"></category-tab>
      </div>
      <div class="content">
        <category-content :curId="curId"></category-content>
      </div>
    </div>
  </div>
</template>
<script>
  import HomeHeader from './header';
  import CategoryTab from './tab';
  import CategoryContent from './content';
  export default {
    name: 'Category',
    data() {
      return {
        curId:""
      };
    },
    components: {
      HomeHeader,
      CategoryTab,
      CategoryContent
    },
    methods: {
      switchTab(id) {
        this.curId=id;
      }
    }
  };
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.category{
  overflow: hidden;
  height: 100%;
  width: 100%;
  background-color: $bgc-theme;
}
.g-content-container{
  display: flex;
  .sidebar{
    width: 80px;
    height: 100%;
  }
  .content{
    flex: 1;
    height: 100%;
  }
}
</style>
