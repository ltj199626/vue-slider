/**
 * 工具类js
 */

const tool = {

/**
 *
 * 获取url并转换成obj
 * 使用例子：http://192.168.0.0:8080?accountId=123&content=456 => {accountId: 123, content: 456};
 */
  getUrlParams() {
    let url = location.href.split('?')[1]; // 获取url中"?"符后的字串
    if (!url) return {};
    let theRequest = {};
    let strs = url.split("&");
    for (let i = 0; i < strs.length; i++) {
      let str2 = strs[i].substr(strs[i].indexOf('=') + 1);
      theRequest[strs[i].split("=")[0]] = unescape(str2);
    }
    return theRequest;
  },

/**
 *
 * 数字转货币
 * 入参： value => 需转换货币格式的数字
 * 使用例子：36501235 => 36,501,235
 */
  numberToMoney(value) {
    let fuhao = '';
    if(typeof value == 'number' || (typeof Number(value) == 'number' && !isNaN(Number(value))) ){
      value = String(value);
      let fixedNum = value.split('.')[1];
      value = value.split('.')[0];

      if(value.charAt(0) == '-'){
        fuhao = '-';
        value = value.substring(1);
      }
      let len = value.length,
          lastIndex = null,
          arr = [];
      while( len > 0 ) {
        lastIndex = len;
        len -= 3;
        arr.unshift( value.substring(len, lastIndex) );
      }
      if(fixedNum){
        return fuhao + arr.join(',') + '.' + fixedNum;
      }
      return fuhao + arr.join(',');
    } else if (!value || value == null) {
      return '0';
    }
    return value;
  },

  // input框只允许输入数字
  filterInput(e, value) {
    let reg = /[0-9|\.|Backspace]/;
    if (!reg.test(e.key) || (e.key === '.' && String(value).indexOf('.') !== -1) || (String(value).length > 8 && e.key !== 'Backspace')) {
      e.preventDefault();
    }
  },
};

export default tool;
