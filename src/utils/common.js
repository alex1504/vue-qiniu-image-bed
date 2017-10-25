import axios from 'axios'
import storage from './storage'
export default {
  getQiniuAuth() {
    const qiniuFlag = storage.get("qiniu-active");
    const privateSettings = storage.get("qiniu-settings");
    const publicSettings = storage.get("qiniu-settings-public");
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
      return {
        accessKey:
          (publicSettings &&
            publicSettings.accessKey) ||
          "",
        secretKey:
          (publicSettings &&
            publicSettings.secretKey) ||
          "",
        bucket:
          (publicSettings &&
            publicSettings.bucket) ||
          "",
        domain:
          (publicSettings &&
            publicSettings.domain) ||
          ""
      }

    }
  }
}
