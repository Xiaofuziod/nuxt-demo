<template>
  <div class="banner-5">
    <div class="title1">{{ $t("Banner5_title1_1") }}</div>
    <DirectionAwareHoverEffect/>
  </div>
</template>
<script>

import DirectionAwareHoverEffect from "@/components/pageui/DirectionAwareHoverEffect.vue";

export default {
  name: 'Banner5',
  components: {DirectionAwareHoverEffect},
  methods: {
    adjustScale() {
      const targetHeight = getComputedStyle(document.querySelector('.swiper-container')).height.split('px')[0]
      if(!targetHeight) return
      const content = document.querySelector('.banner-5'); // 假设内容在这个元素内
      const contentHeight = content.offsetHeight + 30; // 获取当前内容的高度
      if(contentHeight > targetHeight) {
        const scale = targetHeight / contentHeight; // 计算缩放比例
        // 应用缩放
        content.style.transform = `scale(${scale})`;
        content.style.transformOrigin = 'top'; // 根据需要设置变换原点
      }
    }
  },
  mounted() {
    this.adjustScale()
  }
}
</script>
<style lang="less">

.banner-5 {
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  width: 1198.3px;
  align-items: center;
  justify-content: center;
  .title1 {
    width: 1198px;
    height: 86px;
    text-align: center;
    margin-bottom: 60px;
    font-family: aifont;
    font-style: normal;
    font-weight: 400;
    font-size: 64px;
    line-height: 85px;
    text-transform: capitalize;
    color: #CEB864;
  }
}

</style>
