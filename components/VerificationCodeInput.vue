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
      // 阻止默认粘贴行为
      event.preventDefault();
      // 从粘贴事件获取文本值
      const text = event.clipboardData.getData('text').slice(0, this.inputs.length);
      // 分割文本填充到输入框
      text.split('').forEach((char, index) => {
        this.inputs[index] = char;
      });
      // 更新视图
      this.$nextTick(() => {
        // 如果粘贴的文本填满了所有输入框，则验证
        if (text.length === this.inputs.length) {
          this.validateCode();
        } else {
          // 否则，将焦点移动到下一个空输入框
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
  max-width: 300px;
  margin:30px auto;
}
.verification-input {
  width: 40px;
  height: 50px;
  text-align: center;
}
</style>
