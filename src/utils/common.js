import axios from 'axios'
import storage from './storage'

const publicSettings = {
  accessKey: "WqHb4bf7PzMbq5dmqBf6oA9PNkqdNYqF0dbs6JpK",
  secretKey: "DUqjuJW3jziYEoC5JaiqF8o3jAKvsxOJoAtV2AOv",
  bucket: "public",
  domain: "http://oydgatjao.bkt.clouddn.com"
}
export default {
  getPublicSettings() {
    return publicSettings
  },
  getQiniuAuth() {
    const qiniuFlag = storage.get("qiniu-active");
    const privateSettings = storage.get("qiniu-settings");
    if (qiniuFlag == 1) {
      return {
        accessKey:
          (privateSettings &&
            privateSettings.accessKey) ||
          "",
        secretKey:
          (privateSettings &&
            privateSettings.secretKey) ||
          "",
        bucket:
          (privateSettings &&
            privateSettings.bucket) ||
          "",
        domain:
          (privateSettings &&
            privateSettings.domain) ||
          ""
      };
    } else if (qiniuFlag == 2) {
      return publicSettings

    }
  },
  isSetQiniuAuth() {
    return storage.get("qiniu-settings") != null
  },
  getFormatDate(ms) {
    const aDate = new Date(ms);
    const year = aDate.getFullYear();
    const month = aDate.getMonth() + 1;
    const date = aDate.getDate();
    return `${year}-${month}-${date}`

  },
  debounce(func, wait, immediate) {
    var timeout, result;
    var debounced = function () {
      var context = this;
      var args = arguments;
      if (timeout) clearTimeout(timeout);
      if (immediate) {
        var callNow = !timeout;
        timeout = setTimeout(function () {
          timeout = null;
        }, wait)
        if (callNow) result = func.apply(context, args)
      } else {
        timeout = setTimeout(function () {
          func.apply(context, args)
        }, wait);
      }
      return result;
    };
    debounced.cancel = function () {
      clearTimeout(timeout);
      timeout = null;
    };

    return debounced;
  }
}
