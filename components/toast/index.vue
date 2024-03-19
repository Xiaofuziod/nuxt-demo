<template>
  <div v-if="visible" class="toast" :class="`toast-${type}`">
    <img v-if="type === 'error'" src="@/assets/imgs/error.svg" alt="">
    <img v-if="type === 'success'" src="@/assets/imgs/success.svg" alt="">
    <div class="toast-content">
      {{ content }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {type: String, required: false},
    icon: {type: String, default: ''},
    type: {type: String, default: 'info'} // 类型可以是 info, success, warning, error
  },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    show() {
      this.visible = true;
      setTimeout(() => {
        this.visible = false;
      }, 3000); // 3秒后自动消失
    },
  },
}
</script>

<style scoped>
.toast {
  /* 样式设置 */
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 48px;
  z-index: 1000;
  display: flex;
  min-width: 180px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(138, 173, 188, 0.10);
  backdrop-filter: blur(108.94999694824219px);
}

.toast img {
  /* 图标样式 */
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.toast-content {
  /* 消息内容样式 */
  max-width: 300px;
}

.toast-success, .toast-info,.toast-warning {
  /* 成功消息样式 */
  color: #8CB4BD;
  font-family: Avenir;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: capitalize;
}

.toast-error {
  /* 错误消息样式 */
  color: #F44653;
  font-family: Avenir;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  text-transform: capitalize;
}

/* 其他样式 */
</style>
