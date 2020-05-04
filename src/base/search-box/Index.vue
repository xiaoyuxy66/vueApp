<template>
  <div class="mine-search-box-container">
    <i class="iconfont icon-search"></i>
    <div class="mine-search-box" v-if="fake">{{placeholder}}</div>
    <input
      ref="input"
      class="mine-search-box"
      :placeholder="placeholder"
      type="text"
      v-model="query"
      title="搜索框"
      v-if="!fake"
    />
    <i
      class="iconfont icon-close"
      v-show="query"
      @click="reset"
    ></i>
  </div>
</template>
<script>
import {debounce} from 'assets/js/utils';
export default {
  name:'MeSearchBox',
  data(){
    return{
      query:'',
    }
  },
  props:{
    placeholder:{
      type:String,
      default:''
    },
    fake:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    //监控输入框内容,这样的话每输入一个就会触发，会频繁出发，所以这里经常用截流函数
    // query(newVal,oldVal){
    //   this.$emit("query",this.query);
    // }
    //监控query执行debounce()函数的返回函数，这个返回函数的参数是query(newVal,oldVal)
    query:debounce(function(){
      this.$emit("query",this.query);
    })
  },
  methods:{
    focus(){
      //原生获取焦点方法
      this.$refs.input&&this.$refs.input.focus();
    },
    clear(){
      this.query='';
    },
    reset(){
      this.clear();
      this.focus();
    },
  }
}
</script>
<style lang="scss" scoped>
 @import "~assets/scss/mixins";

 $search-box-height: 30px;
.mine-search-box-container{
  display: flex;
  align-items: center;
  width: 100%;
  height: $search-box-height;
  padding: 0 7px;
  background-color: #fff;
  border-radius: $search-box-height / 2;
}
.iconfont {
  color: $icon-color;
  font-size: $icon-font-size-sm;
  font-weight: bold;
}
.mine-search-box {
  flex: 1;
  background: none;
  border: none;
  margin: 0 6px;
  color: #666;
  line-height: 1.5;
}
</style>