<template>
    <div class="banner-wrapper">
      <div class="banner-content">
        <div class="title1">{{ $t("MobileBanner1_title1_1") }}</div>
        <div class="title2">{{ $t("MobileBanner1_title2_1") }}</div>
        <div class="desc-code">
          <typing-text
              font-size="16px"
              margin-bottom="12px"
              width="20ch"
              :lines="[
              { text: 'SIMPLE, EFFICIENT,' },
              { text: 'BARRIER FREE ' }        ]"
          />
        </div>
      </div>
    </div>
</template>
<script>
import HomeBanner1 from "@/components/pageui/homeBanner1.vue";

export default {
  name: 'MobileBanner1',
  components: {HomeBanner1},
}
</script>
<style scoped lang="less">
.banner-wrapper {
  margin-top: 1rem;
  height: 378px;
  min-height: 378px;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  .banner-content {
    fill: rgba(11, 14, 12, 0.4);
    backdrop-filter: blur(50px);
    clip-path: polygon(
        0 10%,
        10% 0,
        100% 0,
        100% 100%,
        10% 100%,
        0 90%
    );
    width: calc(100vw - 20px);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    .desc-code {
      margin-top: 40px;
      width: 271px;
    }

    .title1 {
      color: #FFF;
      font-family: aifont;
      font-size: 40px;
      font-style: normal;
      font-weight: 400;
      line-height: 64px; /* 160% */
      text-transform: capitalize;
    }

    .title2 {
      color: var(--ceb-864, #CEB864);
      font-family: aifontf;
      font-size: 45px;
      font-style: normal;
      font-weight: 800;
      line-height: 64px;
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
}

</style>
