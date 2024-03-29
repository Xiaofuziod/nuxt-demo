<template>
  <div v-html="renderedContent" class="mk-box"></div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  },
  computed: {
    renderedContent() {
      // 简单的Markdown检测逻辑
      if (this.isMarkdown(this.content)) {
        return this.$md.render(this.content);
      } else {
        // 对于普通文本，转义HTML标签以避免XSS攻击，并保持换行
        return this.escapeHtml(this.content).replace(/\r\n|\r|\n/g, '<br>');
      }
    }
  },
  methods: {
    isMarkdown(text) {
      // 检测Markdown特征，如标题符号、加粗、斜体等
      const markdownPattern = /[#_*\[\]()~>+-]|!\[|```/;
      return markdownPattern.test(text);
    },
    escapeHtml(unsafeText) {
      return unsafeText
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");
    }
  }
}
</script>
<style lang="less">

.mk-box {
  p {
    color: #FFF;
    font-family: Avenir;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.5;
  }
  p,ul,ol {
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  ul, ol {
    padding-left: 15px;
  }
}

</style>
