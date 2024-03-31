<template>
  <p class="card-state">
    <span class="state-btn">
      {{$t("Invalid")}}
    </span>
    <span class="time">
      <img src="@/assets/imgs/card/failed.svg" alt="">
      <span>{{$t("CanceledDesc")}}</span>
    </span>
  </p>
</template>
<script>
export default {
  name: "Cancelled",
  props: {
    card: {
      type: Object
    }
  }
}
</script>
<style lang="less" scoped>
.card-state {
  display: inline-flex;
  align-items: center;
  .state-btn {
    padding: 4px 15px;
    flex-shrink: 0;
    color: rgba(255, 255, 255, 0.30);
    font-family: Avenir;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.10);
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
