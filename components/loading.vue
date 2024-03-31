<template>
  <div class="loading-overlay" v-show="show">
    <div class="loading-content">
      <div class="chat-bubble">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      {{text || langt['loading_span_1']}}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      text: ""
    };
  },
  computed:{
    langt() {
      return this.$store.state.lang.t
    }
  },
  methods: {
    start(text) {
      this.show = true;
      this.text = text
    },
    finish() {
      this.text = ''
      this.show = false;
    },
    end() {
      this.text = ''
      this.show = false;
    }
  }
};
</script>

<style lang="less">
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  .loading-content {
    position: relative;
    margin: 30px auto;
    width: 200px;
    height: 50px;
    border-radius: 8px;
    background: rgba(138, 173, 188, 0.10);
    backdrop-filter: blur(108.94999694824219px);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #8CB4BD;

    font-family: Avenir;
    font-size: 14px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
  }


  /* 聊天气泡的基本样式 */
  .chat-bubble {
    display: flex;
    gap: 7px; /* 点之间的间隔 */
    padding: 6px;
    margin-right: 10px;
  }

  /* 点的基本样式 */
  .dot {
    width: 8px;
    height: 8px;
    background-color: rgba(217, 217, 217, 0.2);
    border-radius: 50%;
    animation: blink 1.5s infinite; /* 应用动画 */
  }

  /* 定义动画 */
  @keyframes blink {
    0%, 100% {
      background-color: rgba(217, 217, 217, 0.2);
    }
    50% {
      background-color: #D9D9D9;
    }
  }

  /* 为每个点设置不同的动画延迟，实现轮流变色的效果 */
  .dot:nth-child(1) {
    animation-delay: 0s;
  }

  .dot:nth-child(2) {
    animation-delay: 0.4s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.8s;
  }

}
</style>
