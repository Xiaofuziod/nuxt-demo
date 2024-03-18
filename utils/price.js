export function formatPrice(price) {
  if (price >= 1) {
    // 如果价格大于 0，直接四舍五入到小数点后两位
    return parseFloat(price.toFixed(2));
  } else {
    // 如果价格小于 1，使用科学计数法转换，保留四位有效数字
    let formatted = Number.parseFloat(price.toPrecision(4));
    // 如果结果为0（比如极小的负数四舍五入后可能为0），则进一步处理以保留小数点后的位数
    if (formatted === 0) {
      // 使用正则表达式匹配科学计数法中的指数部分
      let match = price.toExponential().match(/e-(\d+)/);
      if (match) {
        let decimalPlaces = parseInt(match[1], 10) - 1; // 减1是因为toPrecision(4)已经包含一个有效数字
        formatted = parseFloat(price.toFixed(decimalPlaces));
      }
    }
    return formatted;
  }
}

