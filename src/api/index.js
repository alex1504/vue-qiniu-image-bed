import axios from 'axios'
import storage from '../utils/storage'
/* import Util from '../utils/common'

Util.setHeadersCommon({
    accessKey: storage.get("qiniu-settings") && storage.get("qiniu-settings").accessKey,
    secretKey: storage.get("qiniu-settings") && storage.get("qiniu-settings").secretKey,
    bucket: storage.get("qiniu-settings") && storage.get("qiniu-settings").bucket
}) */

if (process.env.NODE_ENV == 'development') {
  // axios.defaults.baseURL = '/api';
  axios.defaults.baseURL = 'http://127.0.0.1:3000';
} else {
  axios.defaults.baseURL = 'https://qiniu-server.herokuapp.com';
}

export default {
  uploadFile(auth, files) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      Array.prototype.forEach.call(files, (file,index) => {
        formData.append("file"+index, file, file.name);
      })
      for (let key in auth) {
        formData.append(key, auth[key])
      }
      console.log(formData)
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios.post("/upload", formData, config).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  getImageList(auth) {
    return new Promise((resolve, reject) => {
      axios.post("/imageList", {
        accessKey: auth.accessKey,
        secretKey: auth.secretKey,
        bucket: auth.bucket,
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  deleteImage(data) {
    return new Promise((resolve, reject) => {
      axios.post("/image/delete", {
        accessKey: data.accessKey,
        secretKey: data.secretKey,
        bucket: data.bucket,
        fileName: data.fileName
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  }
}
