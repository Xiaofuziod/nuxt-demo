export function extractParametersFromUrl(url) {
  // 使用URL API解析完整的URL
  const urlObj = new URL(url);

  // 获取哈希部分，并去除开头的`#`
  const hash = urlObj.hash.substring(1);

  // 使用URLSearchParams来解析哈希部分
  const params = new URLSearchParams(hash);

  // 创建一个对象来存储所有参数
  const parameters = {};

  // 遍历所有参数并存储在对象中
  params.forEach((value, key) => {
    parameters[key] = value;
  });

  return parameters;
}
