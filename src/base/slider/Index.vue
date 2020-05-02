<template>
  <swiper :options='swiperOption' :key="keyId">
    <!--<swiper-slide v-for="item in sliders">-->
      <!--<a href="">-->
        <!--<img src="" alt=""/>-->
      <!--</a>-->
    <!--</swiper-slide>-->
    <slot></slot>
    <div class="swiper-pagination" v-if="pagination" slot="pagination"></div>
  </swiper>
</template>
<script>
  import {swiper} from 'vue-awesome-swiper';
  export default {
    name: 'MeSlider',
    data() {
      return {
        swiperOption: {},
        keyId: Math.random()
      };
    },
    components: {
      swiper
    },
    props: {
      // 父组件传过来的值 不传对象过来的原因是 一个一个会更好验证
      direction: {
        type: String,
        default: 'horizontal',
        validator(value) {
          return ['horizontal', 'vertical'].indexOf(value) > -1; // 返回true/false
        }
      },
      interval: {
        type: Number,
        default: 3000,
        validator(value) {
          return value >= 0;
        }
      },
      loop: {
        type: Boolean,
        default: true
      },
      pagination: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        // 引用类型
        default() {
          return [];
        }
      }
    },
    watch: {
      // swipe无缝滚动的一些问题解决方式
      data(newValue) {
        if (newValue.length === 0) {
          return;
        }
        // swipe 1张图片无缝滚动的问题
        this.swiperOption.loop = newValue.length === 1 ? false : this.loop;
        this.keyId = Math.random();
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.swiperOption = {
          watchOverflow: true, // 如果只有一张图就不用左右滑动了
          direction: this.direction, // 横还是竖着滚
          autoplay: this.interval ? {
            delay: this.interval, // 是否自动滚动
            disableOnInteraction: false // 自动滚动的时候 如果手指滑动是否停止自动轮播
          } : false,
          slidesPerView: 1, // 容器同时可以看到的图片
          loop: this.data.length <= 1 ? false : this.loop, // 是否开启无缝滚动如果只有一张图片不开启否则开启
          pagination: {
            el: this.pagination ? '.swiper-pagination' : null // 分页器
          }
        };
      }
    }
  };
</script>
<style lang="scss" scoped>
.swiper-container {
    width: 100%;
    height: 100%;
  }
</style>
