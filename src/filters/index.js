
/**
 *  过滤函数
 */

export default {
  toFixed: function (value, num) {
    if (isNaN(value)) value = 0;
    if (value == null || value === undefined) {
      return '--'
    } else {
      if (typeof (value) === 'string' && value.indexOf('%') !== -1) {
        value = Number(value.replace('%', ''))
        return value.toFixed(num) + '%'
      }
      value = Number(value)
      return value.toFixed(num)
    }
  },
  filterClass (num) {
    num = Number(num);
    if (typeof (num) === 'string' && num.indexOf('%') !== -1) {
      num = Number(num.replace('%', ''))
    }

    return !num ? '' : num > 0 ? 'red' : 'green'
  },
  numberToMoney: function (value) {
    let fuhao = '';
    if (typeof value === 'number' || (typeof Number(value) === 'number' && !isNaN(Number(value)))) {
      value = value + '';
      let fixedNum = value.split('.')[1];
      value = value.split('.')[0];

      if (value.charAt(0) === '-') {
        fuhao = '-';
        value = value.substring(1)
      }
      let len = value.length;
      let lastIndex;
      let arr = [];
      while (len > 0) {
        lastIndex = len;
        len -= 3;
        arr.unshift(value.substring(len, lastIndex))
      }
      if (fixedNum) {
        return fuhao + arr.join(',') + '.' + fixedNum
      }
      return fuhao + arr.join(',')
    } else if (!value || value == null) {
      return '0'
    }
    return value
  }
}
