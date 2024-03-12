<template>
  <div v-if="visible" class="toast" :class="`toast-${type}`">
    <i v-if="icon" class="icon" :class="`icon-${icon}`"></i>
    <div class="toast-content">
      {{ content}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {type: String, required: true},
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

<style>
.toast {
  /* 样式设置 */
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px;
  border-radius: 5px;
  color: #000000;
  z-index: 1000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #FFFFFF;
}

.toast-content {
  /* 消息内容样式 */
  max-width: 300px;
}

.toast-success {
  /* 成功消息样式 */
}

.toast-error {
  /* 错误消息样式 */
}

/* 其他样式 */
</style>
