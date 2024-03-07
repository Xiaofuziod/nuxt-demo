<template>
  <transition name="modal">
    <div class="modal-mask" v-if="visible">
      <div class="modal-wrapper">
        <div class="modal-container">
          <slot name="header"></slot>
          <slot name="body">
          </slot>
          <slot name="footer">
            <button @click="closeModal">关闭</button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
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
  background-color: #0056b3;
  border-radius: 31px;
  width: 800px;
  margin: 100px auto;
  box-sizing: inherit;
  padding: 30px;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.5s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>
