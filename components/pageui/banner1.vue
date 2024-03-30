<template>
  <div class="b-wrapper">
    <div class="banner-1">
      <div class="banner-left">
        <div class="title1">YOUR CRYPTO</div>
        <div class="title2">AI CO-PILOT</div>
        <div class="desc-code">
          <typing-text
              font-size="29px"
              margin-bottom="12px"
              width="20ch"
              :lines="[
              { text: 'SIMPLE, EFFICIENT,' },
              { text: 'BARRIER FREE ' }        ]"
          />
        </div>
      </div>
      <home-banner1/>
    </div>
  </div>
</template>
<script>
import HomeBanner1 from "@/components/pageui/homeBanner1.vue";

export default {
  name: 'Banner1',
  components: {HomeBanner1},
  methods: {
    adjustScale() {
      const targetHeight = getComputedStyle(document.querySelector('.swiper-container')).height.split('px')[0]
      if(!targetHeight) return
      const content = document.querySelector('.banner-1'); // 假设内容在这个元素内
      const contentHeight = content.offsetHeight + 10; // 获取当前内容的高度
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
.b-wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}
.banner-1 {
  width: 1244px;
  height: 702.7px;
  margin: auto;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .banner-left {
    padding: 181px 0 101px 64px;

    .desc-code {
      margin-top: 117px;
    }

    .title1 {
      width: 595px;
      font-family: aifont;
      text-transform: capitalize;
      color: #FFF;
      font-size: 78px;
      font-style: normal;
      font-weight: 400;
      line-height: 100px;
    }

    .title2 {
      color: rgba(206, 184, 100, 1);
      width: 595px;
      height: 100px;
      font-family: aifont;
      font-size: 80px;
      font-style: normal;
      line-height: 100px;
      text-transform: capitalize;
    }

    .banner-1-btn {
      width: 298px;
      height: 71px;
      border-radius: 51px;
      background: rgba(217, 217, 217, 1);
      margin: 20px 0;
    }

    .desc-img {
      height: 96px;
    }
  }

  &:after {
    background: rgba(11, 14, 12, 0.3);
    backdrop-filter: blur(100px);
    content: '';
    position: absolute;
    width: 1427px;
    height: 1468px;
    transform: rotate(45deg);
    left: 5px;
    top: -375px;
    z-index: -1;
  }
}

</style>
