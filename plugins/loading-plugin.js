import Vue from 'vue';
import Loading from '~/components/loading.vue';
import PageLoading from '@/components/pageLoadingGloba.vue'
Vue.component('Loading', Loading);
Vue.component('pageLoading', PageLoading);


const LoadingPlugin = {
    install(Vue, options) {
        const VueLoading = new Vue({
            render: h => h(Loading)
        }).$mount();

        document.body.appendChild(VueLoading.$el);

        Vue.prototype.$loading = VueLoading.$children[0];

        const pageLoading = new Vue({
            render: h => h(PageLoading)
        }).$mount();

        document.body.appendChild(pageLoading.$el);
        Vue.prototype.$pageLoading = pageLoading.$children[0];
    }
};

Vue.use(LoadingPlugin);

export default LoadingPlugin;
