import Vue from 'vue';
import Loading from '~/components/loading.vue';

Vue.component('Loading', Loading);

const LoadingPlugin = {
    install(Vue, options) {
        const VueLoading = new Vue({
            render: h => h(Loading)
        }).$mount();

        document.body.appendChild(VueLoading.$el);

        Vue.prototype.$loading = VueLoading.$children[0];
    }
};

Vue.use(LoadingPlugin);

export default LoadingPlugin;
