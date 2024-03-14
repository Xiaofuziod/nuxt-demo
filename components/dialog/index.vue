<template>
  <transition name="modal">
    <div class="modal-mask" v-if="visible">
      <div class="modal-wrapper">
        <div class="modal-container" :style="{width: width}">
          <img class="close-img" @click="closeModal" src="@/assets/imgs/login/close.svg" alt="">
          <slot name="header"></slot>
          <div class="modal-center">
            <slot name="body">
            </slot>
          </div>
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '800px',
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    openModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
    },
  },
};
</script>

<style scoped>
.modal-mask {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, .5);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  /* 弹窗遮罩样式 */
}

.modal-wrapper {
  /* 弹窗包装样式 */
}

.modal-container {
  /* 弹窗内容样式 */
  border-radius: 32px;
  background: rgba(38, 64, 64, 0.30);
  backdrop-filter: blur(100px);
  width: 800px;
  max-height: 80vh;
  margin: 100px auto;
  box-sizing: inherit;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;

  .close-img {
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: absolute;
    right: 24px;
    top: 24px;
    z-index: 2;
  }
}

.modal-center {
  flex: 1;
  overflow-y: auto;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>
