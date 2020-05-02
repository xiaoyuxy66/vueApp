<template>
 <swiper :options="swiperOption" ref='swiper'>
    <!--下拉-->
    <div class="mine-scroll-pull-down" v-if="pullDown">
      <me-loading inline :text="pullDownText" ref="pullDownLoading"></me-loading>
    </div>
    <swiper-slide>
      <slot></slot>
    </swiper-slide>
     <!--上拉-->
     <div class="mine-scroll-pull-up" v-if="pullUp">
      <me-loading inline :text="pullUpText" ref="pullUpLoading"></me-loading>
    </div>
    <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
  </swiper>
</template>
<script>
// 滚动条组件同样是用swiper实现的 下拉刷新，上拉加载
  import {swiper, swiperSlide} from 'vue-awesome-swiper';
  import MeLoading from '../loading';
  import {
    PULL_DOWN_HEIGHT,
    PULL_DOWN_TEXT_INIT,
    PULL_DOWN_TEXT_START,
    PULL_DOWN_TEXT_ING,
    PULL_DOWN_TEXT_END,
    PULL_UP_HEIGHT,
    PULL_UP_TEXT_INIT,
    PULL_UP_TEXT_START,
    PULL_UP_TEXT_ING,
    PULL_UP_TEXT_END
  } from './config';

  export default {
    name: 'MeScroll',
    data() {
      return {
        pullFlag: false, // 是否正在下拉加载的标识位
        pullDownText: PULL_DOWN_TEXT_INIT,
        pullUpText: PULL_UP_TEXT_INIT
      };
    },
    components: {
      swiper,
      swiperSlide,
      MeLoading
    },
    props: {
      scrollbar: {
        type: Boolean,
        default: true
      },
      pullDown: {
        type: Boolean,
        default: true
      },
      pullUp: {
        type: Boolean,
        default: true
      },
      dataObject: {
        type: [Array, Object] // 可以是数组可以是对象
      }
    },
    created() {
      this.init();
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
            el: this.scrollbar ? '.swiper-scrollbar' : null,
            // 停止滚动后自动隐藏
            hide: true
          },
          // swiper绑定事件
          on: {
            sliderMove: this.scroll, // 下拉
            touchEnd: this.touchEnd, // 松手
            transitionEnd: this.scrollEnd // 向上滑动时监听scrollEnd
          }
        };
      },
      // recommend 异步加载之后滚动条要更新，否则不滚动
      update() {
        console.log(this.$refs.swiper);
        this.$refs.swiper && this.$refs.swiper.swiper.update();
      },
      // 返回顶部
      scrollToTop(speed, runCallbacks) {
        this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallbacks);
      },

      scroll() {
        let swiper = this.$refs.swiper.swiper;
        console.log(swiper.translate); // >0下拉，<0上拉

        // 监控什么时候出现回到顶部
        this.$emit('scroll', swiper.translate, this.$refs.swiper.swiper);

        if (this.pullFlag) {
          return;
        }
        if (swiper.translate > 0) {
          // 不需要下拉加载
          if (!this.pullDown) {
            return;
          }
          if (swiper.translate > PULL_DOWN_HEIGHT) {
            // this.pullDownText="" 这种形式会重新渲染，一闪一闪的

            // 触发这个ref的setText方法
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_START);
          } else {
            this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_INIT);
          }
        } else if (swiper.isEnd) { // 是否已经滚动到底部  上拉
          if (!this.pullUp) {
            return;
          }
          // 上拉触发条件
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > parseInt(swiper.$wrapperEl.css('height'));
          if (isPullUp) {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_START);
          } else {
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_INIT);
          }
        }
      },
      // 滚动分为快滚，跟滚一次，当快速滚动结束时候触发这个事件
      scrollEnd() {
        const swiper = this.$refs.swiper.swiper;
        // 滚动结束触发，满足一定距离返回顶部出现
        this.$emit('scroll-end', swiper.translate, swiper, this.pullFlag);
      },
      // 松开手 开始请求数据
      touchEnd() {
        let swiper = this.$refs.swiper.swiper;
        if (this.pullFlag) {
          return;
        }
        if (swiper.translate > PULL_DOWN_HEIGHT) {
          if (!this.pullDown) {
            return;
          }

          this.pullFlag = true; // 标识位
          swiper.allowTouchMove = false;// 禁止触摸
          swiper.setTransition(swiper.params.speed); // 动画
          swiper.setTranslate(PULL_DOWN_HEIGHT);// 回到设定的位置
          swiper.params.virtualTranslate = true;// 定住不给回弹
          this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_ING); // 变化正在刷新的文字
          // 参数是一个函数。 基础组件不做业务，触发一个事件
          this.$emit('pull-down', this.pullDownEnd);
        } else if (swiper.isEnd) {
          // 固定写法
          const totalHeight = parseInt(swiper.$wrapperEl.css('height'));
          const isPullUp = Math.abs(swiper.translate) + swiper.height - PULL_UP_HEIGHT > totalHeight;

          if (isPullUp) { // 上拉
            if (!this.pullUp) {
              return;
            }
            this.pullFlag = true;
            swiper.allowTouchMove = false; // 禁止触摸
            swiper.setTransition(swiper.params.speed);
            swiper.setTranslate(-(totalHeight + PULL_UP_HEIGHT - swiper.height));
            swiper.params.virtualTranslate = true; // 定住不给回弹
            this.$refs.pullUpLoading.setText(PULL_UP_TEXT_ING);
            this.$emit('pull-up', this.pullUpEnd);
          }
        }
      },
      // 下拉完参数归位
      pullDownEnd() {
        const swiper = this.$refs.swiper.swiper;
        this.pullFlag = false;
        this.$refs.pullDownLoading.setText(PULL_DOWN_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
        swiper.setTransition(swiper.params.speed);
        swiper.setTranslate(0);
        // 下拉时头部隐藏，然后松手再出来
        setTimeout(() => {
          this.$emit('pull-down-transition-end');
        }, swiper.params.speed);
      },
      pullUpEnd() {
        const swiper = this.$refs.swiper.swiper;
        this.pullFlag = false;
        this.$refs.pullUpLoading.setText(PULL_UP_TEXT_END);
        swiper.params.virtualTranslate = false;
        swiper.allowTouchMove = true;
        // 上拉不需要归位
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

  .mine-scroll-pull-down{
    width: 100%;
    position: absolute;
    bottom:100%;
    left:0;
    height: 80px;
  }
  .mine-scroll-pull-up{
    width: 100%;
    position: absolute;
    top:100%;
    left:0;
    height: 30px;
  }
</style>
