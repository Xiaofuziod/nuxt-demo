import Vue from 'vue';
import MarkdownIt from 'markdown-it';
import markdownItLinkAttributes from 'markdown-it-link-attributes';


const md = new MarkdownIt().use(markdownItLinkAttributes, {
  pattern: /^(https?|ftp):/, // 只对外部链接应用
  attrs: {
    target: '_blank',
    rel: 'noopener noreferrer'
  }
});

const markdown = {
  install(Vue) {
    Vue.prototype.$md = md;
  }
};

Vue.use(markdown);
