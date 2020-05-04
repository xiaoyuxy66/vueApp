<template>
  <MeNavbar class="header">
    <i class="iconfont icon-back" slot="left" @click="goBack"></i>
    <MeSearchBox 
      slot="center"
      placeholder="开学季有礼，好货5折起" 
      @query="query"
    ></MeSearchBox>
  </MeNavbar>
</template>
<script>
import MeNavbar from 'base/navbar';
import MeSearchBox from 'base/search-box';
export default {
  name:'SearchHeader',
  components:{
    MeNavbar,
    MeSearchBox
  },
  methods:{
    goBack(){
      //window.history.go(-1);
      this.$router.back();
    },
    query(val){
      //再将查询数据传给index
      this.$emit("query",val);
    }
  },
}
</script>
<style lang="scss" scoped>
@import '~assets/scss/mixins';
.header{
  border-bottom: 1px solid $border-color;
  .iconfont{
    color: $icon-color;
    font-size: $icon-font-size;
  }
  .mine-search-box-container{
    background-color: #f7f7f7;
  }
}
</style>