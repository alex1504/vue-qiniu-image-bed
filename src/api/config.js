import storage from '../utils/storage'

export const auth = {
  accessKey: storage.get("qiniu-settings") && storage.get("qiniu-settings").accessKey,
  secretKey: storage.get("qiniu-settings") && storage.get("qiniu-settings").secretKey,
  bucket: storage.get("qiniu-settings") && storage.get("qiniu-settings").bucket
};

export const publicSettings = {
  accessKey: "542DypDdMKrx6xAMN1Ce_kWmtKTLKK5U8x842JYP",
  secretKey: "Knt7eUNDHt-by7Nyq_VZWMsnpyt46BNYwfePODsL",
  bucket: "image",
  domain: "http://qiniu1.huzerui.com"
};
