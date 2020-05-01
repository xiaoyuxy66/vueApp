<template>
  <div class="slider-wrapper">
    <me-loading v-if="!sliders.length"></me-loading>
    <me-slider
      :data="sliders"
      :direction="direction"
      :loop="loop"
      :interval="interval"
      :pagination="pagination"
      v-else
    >
      <swiper-slide v-for="(item,index) in sliders" :key="index">
        <a :href="item.linkUrl" class="slider-link">
          <img :src="item.picUrl" alt='' class="slider-image"/>
        </a>
      </swiper-slide>
    </me-slider>
  </div>
</template>
<script>
  import MeSlider from 'base/slider';// 这是home组件，由于slider与业务无关，所以做一个基本组件
  import {swiperSlide} from 'vue-awesome-swiper';
  import {sliderOptions} from './config';
  import {getHomeSlider} from 'api/home';
  import MeLoading from 'base/loading';
  export default {
    name: 'HomeSlider',
    components: {
      MeSlider,
      swiperSlide,
      MeLoading
    },
    data() {
      return {
        direction: sliderOptions.direction,
        loop: sliderOptions.loop,
        interval: sliderOptions.interval,
        pagination: sliderOptions.pagination,
        sliders: []
      };
    },
    created() {
      this.getSlider();
    },
    methods: {
      getSlider() {
        // console.log(getHomeSlider(),"sdsadsa")
        return getHomeSlider().then(data => {
          // console.log(data,"dara")
          this.sliders = data;
        });
      },
      update(){
        return this.getSlider();//返回一个promise对象
      }
    }
  };
</script>
<style lang="scss" scoped>
.slider-wrapper {
    width: 100%;
    height: 183px;
  }

  .slider-link {
    display: block;
  }

  .slider-link,.slider-image {
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
</style>
