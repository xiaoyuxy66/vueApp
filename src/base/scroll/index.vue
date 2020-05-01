<template>
 <swiper :options="swiperOption" ref='swiper'>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>
<script>
// 滚动条组件同样是用swiper实现的
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  export default {
    name: 'MeScroll',
    data() {
      return {
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto', // 看到几张图片
          freeMode: true, // 随便滚动不是一次只能滚一定距离
          setWrapperSize: true, // 页面height
          scrollbar: { // 判断滚动体是否存在
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            // 停止滚动后自动隐藏
            hide: true
          }
        }
      };
    },
    components: {
      swiper,
      swiperSlide
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      dataObject: {
        type: [Array, Object] // 可以是数组可以是对象
      }
    },
    created() {
      // this.init();
    },
    watch: {
      dataObject() {
        this.update();
      }
    },
    methods: {
      init() {
        this.swiperOption = {
          direction: 'vertical',
          slidesPerView: 'auto', // 看到几张图片
          freeMode: true, // 随便滚动不是一次只能滚一定距离
          setWrapperSize: true, // 页面height
          scrollbar: { // 判断滚动体是否存在
            el: this.scrollbar ? '.swiper-scroll' : null,
            // 停止滚动后自动隐藏
            hide: true
          }
        };
      },
      update() {
        console.log(this.$refs.swiper);
        this.$refs.swiper && this.$refs.swiper.swiper.update();
      }
    }
  };
</script>
<style lang="scss" scoped>
.swiper-container {
    overflow: hidden;
    width: 100%;
    height: 100%;
  };

  .swiper-slide {
    height: auto;
  }
</style>
