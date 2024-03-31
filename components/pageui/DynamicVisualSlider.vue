<template>
  <div class="swiper-container">
    <div class="preview-load">
      <img class="banner-center" src="~/assets/imgs/home-banner-2-center.png">
      <img class="banner-right" src="~/assets/imgs/home-banner-2.svg" alt="">
      <img class="banner-center" src="~/assets/imgs/home-banner-3-center.svg" alt="">
      <img class="banner-right" src="~/assets/imgs/home-banner-3.svg" alt="">
      <img class="banner-center" src="~/assets/imgs/home-banner-4-center.svg" alt="">
      <img class="banner-right" src="~/assets/imgs/home-banner-4.svg" alt="">
      <img class="banner-right" src="@/assets/imgs/map.png" alt="">
    </div>
      <swiper ref="swper" class="swiper" :options="swiperOption" @slideChange="onSlideChange">
        <swiper-slide>
          <banner1/>
        </swiper-slide>
        <swiper-slide>
          <div class="banner-slide banner-slide-1">
            <div class="inner" v-if="realIndex === 1">
              <div class="banner-left">
                <div class="title1">{{ $t("DynamicVisualSlider1_title1_1") }}</div>
                <div class="title2">{{ $t("DynamicVisualSlider1_title1_2") }}</div>
                <div class="desc">{{ $t("DynamicVisualSlider1_desc_1") }}</div>
              </div>
              <img class="banner-center" src="~/assets/imgs/home-banner-2-center.png">
              <img class="banner-right" src="~/assets/imgs/home-banner-2.svg" alt="">
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="banner-slide banner-slide-2">
            <div class="inner"  v-if="realIndex === 2">

            <div class="banner-left">
              <div class="title1">{{ $t("DynamicVisualSlider2_title1_1") }}</div>
              <div class="title2">{{ $t("DynamicVisualSlider2_title1_2") }}</div>
              <div class="desc">{{ $t("DynamicVisualSlider2_desc_1") }}</div>
            </div>
            <img class="banner-center" src="~/assets/imgs/home-banner-3-center.svg" alt="">
            <img class="banner-right" src="~/assets/imgs/home-banner-3.svg" alt="">
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="banner-slide banner-slide-3">
            <div class="inner"  v-if="realIndex === 3">
            <div class="banner-left">
              <div class="title1">{{ $t("DynamicVisualSlider3_title1_1") }}</div>
              <div class="title2">{{ $t("DynamicVisualSlider3_title1_2") }}</div>
              <div class="desc">{{ $t("DynamicVisualSlider3_desc_1") }}</div>
            </div>
            <img class="banner-center" src="~/assets/imgs/home-banner-4-center.svg" alt="">
            <img class="banner-right" src="~/assets/imgs/home-banner-4.svg" alt="">
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <banner4 v-if="realIndex === 4"/>
        </swiper-slide>
        <swiper-slide>
          <banner5/>
        </swiper-slide>
        <swiper-slide class="footer-slide">
          <app-footer/>
        </swiper-slide>
<!--        <div class="swiper-pagination" slot="pagination"></div>-->
      </swiper>
  </div>

</template>

<script>
import {Swiper, SwiperSlide} from 'vue-awesome-swiper'
import Banner1 from "@/components/pageui/banner1.vue";
import Banner4 from "@/components/pageui/banner4.vue";
import Banner5 from "@/components/pageui/banner5.vue";

export default {
  name: 'DynamicVisualSlider',
  title: 'Mousewheel control',
  components: {
    Banner5,
    Banner4,
    Banner1,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      showFooter: false,
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        speed: 1000,
        spaceBetween: 30,
        mousewheel: {
          releaseOnEdges: true,
        },
      },
      swiperInstance: null,
      realIndex: 0
    }
  },
  methods: {
    onSlideChange() {
      this.realIndex =  this.$refs.swper.$swiper.activeIndex
    },
  }
}
</script>

<style lang="less" scoped>

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes zoomIn {
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
.footer-slide {
  height: 200px; // 设置app-footer幻灯片的高度为200px
  .app-footer {
    height: 100%; // 确保app-footer填充整个幻灯片
  }
}
.preview-load {
  position: fixed;
  top: -10000px;
  left: -10000px;
}
.swiper-container {
  position: relative;
  height: calc(100vh - 80px);
  width: 98vw;
}
.banner-slide {
  height: calc(100vh - 80px);
  display: flex;align-items: center;
  justify-content: center;
  .inner {
    height: calc(100vh - 80px);
    width: 1225px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .banner-right {
    width: 310px;
    animation: slideInFromRight 1s ease forwards;
  }

  .banner-center {
    width: 357px;
    animation: zoomIn 1s ease forwards;
  }

  .banner-left {
    padding: 104px 0 101px 60px;
    position: relative;
    width: 520px;
    animation: slideUp 1s ease forwards;
    .title1 {
      width: 595px;
      height: 85px;
      color: rgba(206, 184, 100, 1);
      font-family: aifont;
      font-size: 72px;
      line-height: 120px;
      text-transform: capitalize;
    }

    .title2 {
      color: rgba(217, 217, 217, 1);
      font-size: 56px;
      width: 595px;
      height: 94px;
      font-family: aifont;
      line-height: 120px;
      text-transform: capitalize;
    }

    .desc {
      top: 1252px;
      left: 160px;
      width: 500px;
      height: 132px;
      opacity: 0.5;
      color: rgba(255, 255, 255, 0.5);
      font-size: 24px;
      margin-top: 47px;
    }
  }

  &.banner-slide-3 {
    .title2 {
      font-size: 38px;
    }

    .banner-center {
      width: 390px;
    }

    .banner-right {
      width: 280px;
    }
  }

}
</style>
