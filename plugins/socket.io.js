// plugins/socket.io.js
import io from 'socket.io-client';
import Vue from 'vue';

// 用于保存 socket 实例的变量
let socket = null;

// 创建一个插件来处理 socket 连接逻辑
const SocketPlugin = {
  install(Vue, options) {
    // 连接方法，允许传入一个 URL 来建立连接
    Vue.prototype.$connectSocket = () => {
      // 如果已存在连接，则先断开
      if (socket && socket.connected) {
        socket.disconnect();
      }

      const token = localStorage.getItem('token')
      console.log('开始连接')
      socket = io("https://api-test.taurion.ai?token=" + token);
      // 建立新的连接

      // 监听一些基础事件
      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
      });

      // 也可以添加更多事件监听...
    };

    // 注入 socket 实例，以便可以在应用的其他部分直接使用 socket
    Vue.prototype.$socket = () => socket;
  }
};

Vue.use(SocketPlugin);

// 使用 Nuxt 的 inject 方法将 $connectSocket 函数和 $socket 变量注入到每个组件中
export default (context, inject) => {
  inject('connectSocket', Vue.prototype.$connectSocket);
  inject('socket', Vue.prototype.$socket);
};
