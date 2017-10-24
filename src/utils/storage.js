const uniquePrefix = 'xabcdervqq'
export default {
  detect: function () {
    return (window.localStorage !== 'undefined') ? true : false
  },
  get: function (key) {
    key = `${uniquePrefix}-${key}`
    var value = localStorage.getItem(key);
    try {
      return JSON.parse(value);
    } catch (err) {
      return value;
    }
  },
  set: function (key, value) {
    if (typeof value == 'object') {
      value = JSON.stringify(value);
    }
    key = `${uniquePrefix}-${key}`
    return localStorage.setItem(key, value);
  },
  remove: function (key) {
    return localStorage.removeItem(key);
  }
}
