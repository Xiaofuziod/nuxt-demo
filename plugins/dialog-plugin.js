import Vue from 'vue';
import Dialog from '~/components/dialog/index.vue';

Vue.component('Dialog', Dialog);


const DialogPlugin = {
  install(Vue, options) {
    const VueDialog = new Vue({
      render: h => h(Dialog)
    }).$mount();
    document.body.appendChild(VueDialog.$el);
    Vue.prototype.$dialog = VueDialog.$children[0];
  }
};

Vue.use(DialogPlugin);

export default DialogPlugin;
