<template>
  <div class="typewriter">
    <span v-for="(item,index) in displayedTextList"
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
.highlight{
  color: #CEB864;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>
