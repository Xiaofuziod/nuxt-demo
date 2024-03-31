<template>
  <p class="card-state">
    <span class="state-btn">
      {{$t("Completed")}}
    </span>
    <span class="time">
      <img src="@/assets/imgs/card/fire.svg" alt="">
      <span>{{card?.heat}}{{$t("heatAfter")}}</span>
    </span>
  </p>
</template>
<script>
export default {
  name: "Completed",
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
    color: #42C525;
    font-family: Avenir;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    text-transform: capitalize;
    border-radius: 4px;
    background: rgba(66, 197, 37, 0.1);
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
