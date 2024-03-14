<template>
  <div class="verification-code-input">
    <input
        v-for="(item, index) in inputs"
        :key="index"
        type="text"
        maxlength="1"
        v-model="inputs[index]"
        @input="handleInput(index)"
        @paste="handlePaste"
        ref="inputRefs"
        class="verification-input"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputs: Array(6).fill(''), // 初始化6个输入框的值
    };
  },
  methods: {
    handleInput(index) {
      // 如果当前输入框有值，并且不是最后一个输入框，移动到下一个输入框
      if (this.inputs[index] && index < this.inputs.length - 1) {
        this.$refs.inputRefs[index + 1].focus();
      }
      // 如果所有输入框都有值，发起验证请求
      if (this.inputs.every(input => input)) {
        this.validateCode();
      }
    },
    handlePaste(event) {
      event.preventDefault(); // 阻止默认粘贴行为
      const text = event.clipboardData.getData('text').slice(0, this.inputs.length);

      // 使用 $set 更新数组，确保视图能够响应式地更新
      text.split('').forEach((char, index) => {
        this.$set(this.inputs, index, char);
      });

      // 检查并触发验证逻辑
      this.$nextTick(() => {
        if (text.length === this.inputs.length) {
          this.validateCode();
        } else {
          this.$refs.inputRefs[text.length].focus();
        }
      });
    },
    validateCode() {
      const verificationCode = this.inputs.join('');
      console.log('验证验证码：', verificationCode);
      this.$emit('validate', verificationCode);
    }
  }
};
</script>

<style scoped>
.verification-code-input {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 0 2px;
  box-sizing: border-box;
}

.verification-input {
  border-radius: 8px;
  box-sizing: border-box;
  border: 0.4px solid rgba(140, 180, 189, 0.30);
  width: 47px;
  height: 47px;
  text-align: center;
  background-color: transparent;
  color: #FFFFFF;
  outline: none;
  &:focus {
    border: 1px solid #8CB4BD;
  }
}
</style>
