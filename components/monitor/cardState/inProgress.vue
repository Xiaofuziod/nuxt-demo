<template>
  <div class="card-state">
    <span class="state-btn">
      {{$t("inProgress")}}
    </span>
    <span class="time">
      <img src="@/assets/imgs/card/link.svg" alt="">
      <span>{{$t("Check")}}</span>
      <img src="@/assets/imgs/card/right.svg" alt="">
    </span>
    <div class="tops-box-wrapper" @click.stop v-if="showBox">
      <div class="inner">
        <img class="close-icon" src="@/assets/imgs/close.svg" @click.stop="showBox = false" alt="">
        <h1 class="titleinner">
          {{ $t("inProgressTitle") }}
        </h1>
        <div class="detail-box">
          <h2 class="title1">
            <img :src="card?.logo" alt="">
            {{ card?.author }}
          </h2>
          <h2 class="title2">
            {{card?.title}}
          </h2>
        </div>
        <a class="btn" :href="card?.link" target="_blank">
          {{$t('GoJoin')}}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "inProgress",
  props: {
    card: {
      type: Object
    }
  },
  data() {
    return {
      showBox: false
    }
  },
  methods: {
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
    color: #CEB864;
    font-family: Avenir;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
    border-radius: 4px;
    background: rgba(206, 184, 100, 0.1);
    backdrop-filter: blur(108.94999694824219px);
  }
  .detail-box {
    .title2 {
      margin-top: 10px;
    }
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
