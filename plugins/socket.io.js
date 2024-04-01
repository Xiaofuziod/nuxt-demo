// plugins/socket.js
import Vue from 'vue';
import io from 'socket.io-client';

// 初始化 WebSocket 连接
let token = localStorage.getItem('token')
let socket = io("https://api.taurion.ai?token=" + token, {
  autoConnect: !!token, // 初始时不自动连接
});

// 尝试重新连接
function reconnect() {
  socket.disconnect();
  console.log('开始重新连接')
  connect();
}

function connect() {
  token = localStorage.getItem('token')
  console.log('开始连接')
  socket = io("https://api.taurion.ai?token=" + token, {
    autoConnect: !!token, // 初始时不自动连接
  });
  socket.connect();
}

const SocketPlugin = {
  install(vue) {
    vue.prototype.$socket = socket;
    vue.prototype.$reconnectSocket = reconnect; // 提供一个方法用于重新连接
  },
};

Vue.use(SocketPlugin);

export default (context, inject) => {
  inject('socket', socket);
  inject("connectSocket", connect);
  inject('reconnectSocket', reconnect); // 允许通过 nuxt 上下文访问
};
