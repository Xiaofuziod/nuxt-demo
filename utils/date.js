export function parseTime(timeStr) {
  // 创建 Date 对象
  const date = new Date(timeStr);

  // 获取当前日期
  const today = new Date();

  // 判断是否是今天
  const isToday = date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  // 获取星期几
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const weekDay = weekDays[date.getDay()];

  // 获取日期和时间
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // 返回结果
  return {
    isToday,
    weekDay,
    date: `${month}/${day}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
}
