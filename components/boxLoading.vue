<template>
  <div class="loading-box" v-if="loading">
    <img src="@/assets/imgs/ZKZg.gif" alt="">
  </div>
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="less" scoped>
.loading-box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;

  img {
    width: 30px;
    height: 30px;
  }
}
</style>
