import Vue from 'vue';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt();

const markdown = {
  install(Vue) {
    Vue.prototype.$md = md;
  }
};

Vue.use(markdown);
