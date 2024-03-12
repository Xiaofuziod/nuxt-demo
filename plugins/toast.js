// plugins/toast.js

import Vue from 'vue';
import ToastComponent from '~/components/toast/index.vue';

const Toast = {};

Toast.install = function (Vue) {
  const ToastConstructor = Vue.extend(ToastComponent);
  const instance = new ToastConstructor();
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);
  Vue.prototype.$toast = {
    show({content, type}) {
      instance.content = content;
      instance.type = type;
      instance.show();
    },
    success(content) {
      instance.content = content;
      instance.type = 'success';
      instance.show();
    },
    error(content) {
      instance.content = content;
      instance.type = 'error';
      instance.show();
    },
    warning(content) {
      instance.content = content;
      instance.type = 'warning';
      instance.show();
    },
    info(content) {
      instance.content = content;
      instance.type = 'info';
      instance.show();
    }
  };
};

Vue.use(Toast);
