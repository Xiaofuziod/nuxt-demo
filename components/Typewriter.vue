<template>
  <div class="typewriter">
    {{ displayedText }}
    <span class="cursor" v-if="!over">{{ $t("Typewriter_cursor_1") }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: String, // 要显示的文本
    typingSpeed: { // 打字速度，单位是毫秒
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      displayedText: '', // 已经显示的文本
      over: false, // 文本是否已经打印完毕
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < this.text.length) {
          this.displayedText += this.text.charAt(i);
          i++;
        } else {
          clearInterval(typingInterval);
          this.over = true;
          this.$emit('writerOver');
        }
      }, this.typingSpeed);
    },
  },
}
</script>

<style scoped>
.cursor {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
