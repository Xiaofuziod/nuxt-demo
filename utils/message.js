
import {parseTime} from './date'
// 格式化消息内容
export function formatMessages(messages) {
  const oneHour = 1000 * 60 * 60; // 一小时的毫秒数
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 设置今天的日期为午夜开始
  let lastTimeShown = -1; // 用于追踪上一次展示时间的小时段
  return messages.map((message) => {
    const timestamp = Number(message.timestamp) * 1000
    const messageDate = new Date(timestamp);
    const isToday = messageDate >= today; // 判断消息是否属于今天

    // 决定是否展示时间
    const showTime = !lastTimeShown || timestamp - lastTimeShown > oneHour;
    if (showTime) {
      lastTimeShown = timestamp; // 更新最后展示时间的时间戳
    }

    const formattedDate = parseTime(messageDate); // 假设存在formatDate函数
    const formattedTime = formattedDate.isToday ? formattedDate.time : formattedDate.date + ' ' + formattedDate.time

    return {
      ...message,
      displayTime: showTime ? formattedTime : null, // 仅在需要展示时间的消息中添加时间字符串
    };
  });
}
