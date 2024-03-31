<template>
  <div class="card-state">
    <span class="state-btn">
      {{$t("unStarted")}}
    </span>
    <span class="time">
      <img src="@/assets/imgs/card/date.svg" alt="">
      <span>{{ card.time }}</span>
    </span>
    <div class="tops-box-wrapper" @click.stop v-if="showBox">
      <div class="inner">
        <img class="close-icon" src="@/assets/imgs/close.svg" @click.stop="showBox = false" alt="">
        <h1 class="titleinner">
          {{ $t("unStartedTitle") }}
        </h1>
        <div class="detail-box">
          <h2 class="title1">
            <img :src="card?.logo" alt="">
            {{ card?.author }}
          </h2>
          <h2 class="title2">
            {{card?.title}}
          </h2>
          <span class="time1">
            <img src="@/assets/imgs/card/date.svg" alt="">
            <span>{{ card.time }}</span>
           </span>
        </div>
        <a class="btn" :href="card?.link" target="_blank">
          {{$t('GoCheck')}}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "unStarted",
  props: {
    card: {
      type: Object
    },
  },

  data() {
    return {
      showBox: false
    }
  },
  methods: {
    goDetail() {
      this.$router.push(this.localeRoute(`/monitoring/detail?id=${this.card?.id}`));
    }
  }
}
</script>
<style lang="less" scoped>
@import "@/assets/css/boxBase.css";
.card-state {
  display: inline-flex;
  align-items: center;
  .state-btn {
    padding: 4px 15px;
    flex-shrink: 0;
    color: #8CB4BD;
    font-family: Avenir;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
    border-radius: 4px;
    background: rgba(138, 173, 188, 0.10);
    backdrop-filter: blur(108.94999694824219px);
  }
  .time {
    padding-left: 12px;
    img {
      margin-right: 2px;
    }
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    color: #CEB864;
  }
}
</style>
