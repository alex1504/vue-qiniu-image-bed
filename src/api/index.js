import axios from 'axios'
import storage from '../utils/storage'
import Util from '../utils/common'

Util.setHeadersCommon({
  accessKey: storage.get("qiniu-settings") && storage.get("qiniu-settings").accessKey,
  secretKey: storage.get("qiniu-settings") && storage.get("qiniu-settings").secretKey,
  bucket: storage.get("qiniu-settings") && storage.get("qiniu-settings").bucket
})

if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = '/api';
} else {
    axios.defaults.baseURL = 'https://qiniu-server.herokuapp.com';
}

export default {
  uploadFile(files) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      console.log(Array.prototype.forEach)
      Array.prototype.forEach.call(files, (file) => {
        formData.append("file", file, file.name);
      })
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
  getImageList() {
    return new Promise((resolve, reject) => {
      axios.post("/imageList").then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  deleteImage(data) {
    return new Promise((resolve, reject) => {
      axios.post("/image/delete", {
        fileName: data.fileName
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  }
}
