import storage from '../utils/storage'
const auth = {
  accessKey: storage.get("qiniu-settings") && storage.get("qiniu-settings").accessKey,
  secretKey: storage.get("qiniu-settings") && storage.get("qiniu-settings").secretKey,
  bucket: storage.get("qiniu-settings") && storage.get("qiniu-settings").bucket
}
export default auth
