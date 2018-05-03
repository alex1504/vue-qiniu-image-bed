import axios from 'axios'
import storage from '../utils/storage'

if (process.env.NODE_ENV == 'development') {
  axios.defaults.baseURL = '/api';
  // axios.defaults.baseURL = 'http://127.0.0.1:3000';
} else {
  axios.defaults.baseURL = 'http://114.67.72.148:3000';
}

export default {
  uploadFile(auth, files, uploadOptions) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      Array.prototype.forEach.call(files, (file, index) => {
        formData.append("file" + index, file, file.name);
      })
      for (let key in auth) {
        formData.append(key, auth[key])
      }
      if (uploadOptions) {
        formData.append('isCustom', "1")
        formData.append('prefix', uploadOptions.prefix)
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
  uploadFetchUrl(obj) {
    return new Promise((resolve, reject) => {
      let postData = {
        accessKey: obj.accessKey,
        secretKey: obj.secretKey,
        bucket: obj.bucket,
        fetchUrl: obj.fetchUrl
      }
      if (obj.uploadOptions) {
        postData.isCustom = "1"
        postData.prefix = obj.uploadOptions.prefix
      }
      axios.post("/upload/fetch", postData).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  getImageList(auth, marker, limit) {
    return new Promise((resolve, reject) => {
      axios.post("/imageList", {
        accessKey: auth.accessKey,
        secretKey: auth.secretKey,
        bucket: auth.bucket,
        marker: marker,
        limit: limit
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  deleteImage(obj) {
    return new Promise((resolve, reject) => {
      axios.post("/image/delete", {
        accessKey: obj.accessKey,
        secretKey: obj.secretKey,
        bucket: obj.bucket,
        fileName: obj.fileName
      }).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      });
    })
  },
  shareImage(info) {
    return new Promise((resolve, reject) => {
      var Image = AV.Object.extend('Image');
      var image = new Image();
      image.set('title', info.title);
      image.set('keyword', info.keyword);
      image.set('type', info.type);
      image.set('source', info.source);
      image.save().then(function (image) {
        resolve(image)
        console.log('New object created with objectId: ' + image.id);
      }, function (error) {
        reject(error)
        // 异常处理
        console.error('Failed to create new object, with error message: ' + error.message);
      });
    })
  },
  searchImage(word) {
    return new Promise((resolve, reject) => {
      const titleQuery = new AV.Query('Image');
      titleQuery.contains('title', word);

      const keywordQuery = new AV.Query('Image');
      keywordQuery.equalTo('keyword', word);

      const typeQuery = new AV.Query('Image');
      typeQuery.equalTo('type', word);

      const query = AV.Query.or(titleQuery, keywordQuery, typeQuery);

      query.find().then(function (res) {
        res = res.map(obj => {
          return obj.attributes
        })
        resolve(res)
      }, function (error) {
        console.log(error)
        reject(error)
      });
    })
  },
  getShareImage() {
    return new Promise((resolve, reject) => {
      const query = new AV.Query('Image');
      query.find().then(function (res) {
        res = res.map(obj => {
          return {
            ...obj.attributes,
            id: obj.id,
            createdAt: new Date(obj.createdAt).getTime()
          }
        })
        resolve(res)
      }, function (error) {
        console.log(error)
        reject(error)
      });

    })
  },
  updateImageCount(id) {
    return new Promise((resolve, reject) => {
      var image = AV.Object.createWithoutData('Image', id);
      image.save().then(function (image) {
        image.increment('count', 1);
        image.save().then(function (res) {
          resolve(res)
        }, function (error) {
          reject(error)
        });
      })
    });
  }

}
