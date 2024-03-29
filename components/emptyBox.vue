<template>
  <div class="center-box empty-box">
    <img src="@/assets/imgs/empty.svg" alt="">
    <span>{{ text || $t("addCoin_span_2") }}</span>
  </div>
</template>
<script>
export default {
  name: "emptyBox",
  props: {
    text: {
      type: String,
    },
  },
}
</script>
<style>
.empty-box {
  display: flex;
  min-width: 200px;
  min-height: 200px;
  flex-direction: column;
  color: rgba(140, 180, 189, 0.60);
  font-family: Avenir;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  text-transform: capitalize;
  img {
    width: 64.757px;
    height: 76.972px;
  }
}
</style>
