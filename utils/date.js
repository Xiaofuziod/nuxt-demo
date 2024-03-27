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
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  // let seconds = date.getSeconds();

// 格式化月份、日期、小时、分钟和秒
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;
  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  // seconds = seconds < 10 ? `0${seconds}` : seconds;

  // 返回结果
  return {
    isToday,
    weekDay,
    date: `${month}/${day}`,
    time: `${hours}:${minutes}`,
  };
}
