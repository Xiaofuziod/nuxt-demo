import Vue from 'vue';
import Loading from '~/components/loading.vue';
Vue.component('Loading', Loading);

export default (context) => {
    // 从插件上下文解构 store
    const { store } = context;

    // 创建 Vue 实例，传递 Vuex store
    const LoadingInstance = new Vue({
        store, // 将 Vuex store 传递给 Vue 实例
        render: h => h(Loading),
    }).$mount();

    // 将实例挂载到 DOM
    document.body.appendChild(LoadingInstance.$el);
    Vue.prototype.$loading = LoadingInstance.$children[0];
};
