// plugins/socket.io.js

import io from 'socket.io-client';

const token = localStorage.getItem('token')
const socket = io("https://api.taurion.ai?token=" + token, {
  reconnectionAttempts: 50,
}); // 确保这里的 URL 指向你的服务端地址

export default (context, inject) => {
  inject('socket', socket);
};
