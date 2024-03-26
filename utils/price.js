export function formatPrice(input) {
  if (!input) return ''
  const priceNum = Number(input)
  if (priceNum >= 1) {
    // 如果价格大于 0，直接四舍五入到小数点后两位
    return parseFloat(priceNum.toFixed(2));
  } else {
    // 首先，检查输入是否为科学计数法
    let str = String(input);
    let result = '';

    if (str.includes('e')) {
      const [mantissa, exponent] = str.split('e');
      const exp = Number(exponent);

      if (exp < 0) {
        // 负指数：小数点左移
        const decimalPlaces = Math.abs(exp) - 1; // 需要在小数点前添加的零的数量
        const mantissaParts = mantissa.split('.');
        const significantDigits = mantissaParts[0] + (mantissaParts[1] || '');
        result = '0.' + '0'.repeat(decimalPlaces) + significantDigits.replace(/^0+/, '');
      } else {
        // 正指数：小数点右移（这种情况较少，因为通常关注的是极小数字）
        result = mantissa.replace('.', '') + '0'.repeat(exp);
      }
    } else {
      result = str;
    }

    // 然后，从第一个非零数字开始保留四位有效数字
    const firstNonZeroIndex = result.search(/[1-9]/);
    if (firstNonZeroIndex !== -1) {
      let zerosBeforeFirstNonZero = result.substring(0, firstNonZeroIndex);
      let afterFirstNonZero = result.substring(firstNonZeroIndex);
      let nonZeroDigits = afterFirstNonZero.replace(/\.|\D/g, ''); // 移除除数字外的字符
      if (nonZeroDigits.length > 4) {
        nonZeroDigits = nonZeroDigits.substring(0, 4);
      }
      const decimalIndex = afterFirstNonZero.indexOf('.');
      if (decimalIndex !== -1) {
        // 保留到非零数字之后的四位，包括小数点
        result = zerosBeforeFirstNonZero + afterFirstNonZero.substring(0, decimalIndex + 1 + nonZeroDigits.length);
      } else {
        result = zerosBeforeFirstNonZero + nonZeroDigits;
      }
    }

    return result;
  }
}

