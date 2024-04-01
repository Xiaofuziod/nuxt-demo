<template>
  <div class="typewriter">
    <span v-if="highlightList.length < 1">
      {{ displayedText }}
    </span>
    <span
        v-else
        v-for="(item,index) in displayedTextList"
          :class="{'highlight': highlightList?.includes(index)}"
          :i="index"
          :key="index">{{ item }}</span>
    <span class="cursor" v-if="!over">{{ $t("Typewriter_cursor_1") }}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: String, // 要显示的文本
    typingSpeed: { // 打字速度，单位是毫秒
      type: Number,
      default: 30,
    },
    highlightList: {
      type: Array,
      default: function () {
        return [];
      },
    }, // 高亮显示的文本
  },
  data() {
    return {
      displayedText: '', // 已经显示的文本
      over: false, // 文本是否已经打印完毕
      currentIndex: 0,
      lastTime: 0, // 上一帧的时间
    };
  },
  computed: {
    displayedTextList() {
      return this.displayedText.split('');
    },
  },
  mounted() {
    this.typeText();
  },
  methods: {
    // typeText() {
    //   let i = 0;
    //   const typingInterval = setInterval(() => {
    //     if (i < this.text.length) {
    //       this.displayedText += this.text.charAt(i);
    //       i++;
    //     } else {
    //       clearInterval(typingInterval);
    //       this.over = true;
    //       this.$emit('writerOver');
    //     }
    //   }, this.typingSpeed);
    // },
    // typeText() {
    //   if (this.currentIndex < this.text.length) {
    //     this.displayedText += this.text.charAt(this.currentIndex++);
    //     window.requestAnimationFrame(this.typeText);
    //   } else {
    //     this.over = true;
    //     this.$emit('writerOver');
    //   }
    // },
    typeText(timestamp = 0) {
      // 如果这是第一帧，或者已经过了足够的时间间隔
      if (!this.lastTime || timestamp - this.lastTime >= this.typingSpeed) {
        if (this.displayedText.length < this.text.length) {
          // 添加下一个字符到 displayedText
          this.displayedText += this.text.charAt(this.displayedText.length);
          // 更新 lastTime
          this.lastTime = timestamp;
        } else {
          // 文本已全部显示，可以在这里停止动画或进行其他操作
          this.over = true;
          this.$emit('writerOver');
          return;
        }
      }

      // 请求下一帧
      window.requestAnimationFrame(this.typeText);
    },
  },
}
</script>

<style scoped>
.cursor {
  animation: blink 0.7s infinite;
}
.highlight{
  color: #CEB864;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
