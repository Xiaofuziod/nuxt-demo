// plugins/socket.io.js

import io from 'socket.io-client';

// const socket = io("https://54.179.0.150?token=88888"); // 确保这里的 URL 指向你的服务端地址
const socket = io("https://api-test.taurion.ai?token=88888",{
  reconnectionAttempts: 5,
}); // 确保这里的 URL 指向你的服务端地址

export default (context, inject) => {
  inject('socket', socket);
};
