import Vue from 'vue';
import VueLazyload from 'vue-lazyload';
import defaultImg from '~/static/default-img.svg';

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: defaultImg,  // 加载失败的图片路径
  loading: defaultImg,  // 默认加载中的图片路径
  attempt: 1  // 尝试加载图片的次数
});
