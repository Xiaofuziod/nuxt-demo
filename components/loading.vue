<template>
  <div class="loading-overlay" v-show="show">
    <div class="loading-content">
      <img  class="loading-img" src="@/assets/imgs/ZKZg.gif" >
      <span>{{ $t('loading_span_1') }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    start() {
      this.show = true;
    },
    finish() {
      this.show = false;
    }
  }
};
</script>

<style>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  .loading-content {
    position: relative;
    margin: 240px auto;
    width: 180px;
    height: 180px;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.16);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    font-size: 16px;
    font-family: aifont;
  }
  .loading-img {
    width: 30px;
    margin-bottom: 10px;
  }
}
</style>
