export function getCookie(name) {
  // 将cookie分割成数组
  let cookies = document.cookie.split(';');

  // 去除cookie名称前的空格，并比较cookie名称
  for(let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    // 检查这个cookie的名称是否匹配我们正在查找的名称
    if (cookie.startsWith(name + '=')) {
      // 返回cookie值
      return cookie.substring(name.length + 1);
    }
  }

  // 如果没有找到，返回null
  return null;
}
