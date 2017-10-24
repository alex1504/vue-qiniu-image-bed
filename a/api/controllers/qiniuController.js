const qiniu = require('qiniu')
const request = require('superagent')
const formidable = require('formidable')
const util = require('util');
const qiniuUtil = require('../utils/qiniu')

function renderUniFileName(type) {
  const map = {
    "jpg": new RegExp(/jpg|jpeg/),
    "png": new RegExp(/png/),
    "gif": new RegExp(/gif/)
  }
  let ext = "";
  if (map.jpg.test(type)) {
    ext = ".jpg"
  }
  if (map.png.test(type)) {
    ext = ".png"
  }
  if (map.gif.test(type)) {
    ext = ".gif"
  }
  const newDate = new Date(Date.now());
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const randomNum = Math.floor(Math.random() * 99999999);
  return `${year}-${month}-${date}/${randomNum}${ext}`
}

/** 
 * [renderUploadToken Function]
 * @param req: {{object}}
 * @param res: {{object}}
 */
function renderUploadToken(req, res) {
  // 注意header中的键名都变为了小写，即便前端传过来包含大写字母
  const accessKey = req.headers.accesskey || '';
  const secretKey = req.headers.secretkey || '';
  const bucket = req.headers.bucket || '';


  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

  const options = {
    scope: bucket,
  };

  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  return uploadToken

};


/** 
 * [uploadFile Function]
 * @param accessKey: {{string}}
 * @param secretKey: {{string}}
 * @param bucket：: {{string}}
 */
function uploadFile(req, res) {
  const form = new formidable.IncomingForm();
  const files = [];

  form.on('file', function (name, file) {
    files.push(file);

  });
  form.on('end', function () {
    const uploadPromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const localFile = file.path;
        const config = new qiniu.conf.Config();
        const formUploader = new qiniu.form_up.FormUploader(config);
        const putExtra = new qiniu.form_up.PutExtra();
        const key = renderUniFileName(file.type);
        console.log(key)
        const uploadToken = renderUploadToken(req, res);

        // 文件上传
        formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
          respBody, respInfo) {
          if (respErr) {
            reject(respErr);
            return;
          }
          if (respInfo.statusCode == 200) {
            resolve({
              hash: respInfo.data.hash,
              key: respInfo.data.key,
              code: respInfo.statusCode
            })
          } else {
            reject(respBody)
            console.log(respInfo.statusCode);
            console.log(respBody);
          }
        });
      })
    })
    Promise.all(uploadPromises)
      .then(resp => {
        console.log(resp)
        res.json(resp)
      })
      .catch(err => {
        res.json(err)
        console.log(err)
      })

  });

  form.parse(req);

};

/** 
 * [getImageInfo Function]
 * @param accessKey: {{string}}
 * @param secretKey: {{string}}
 * @param bucket：: {{string}}
 * @param fileName: {{string}}
 */
function getImageInfo(req, res) {
  const accessKey = req.headers.accesskey || '';
  const secretKey = req.headers.secretkey || '';
  const bucket = req.headers.bucket || '';

  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var config = new qiniu.conf.Config();
  var bucketManager = new qiniu.rs.BucketManager(mac, config);


  var key = req.body.fileName || "17-10-11/89379599.jpg";
  bucketManager.stat(bucket, key, function (err, respBody, respInfo) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      if (respInfo.statusCode == 200) {
        res.json(respBody)
        console.log(respBody.hash);
        console.log(respBody.fsize);
        console.log(respBody.mimeType);
        console.log(respBody.putTime);
        console.log(respBody.type);
      } else {
        res.json({
          code: respInfo.statusCode,
          error: respBody.error
        })
        console.log(respInfo.statusCode);
        console.log(respBody.error);
      }
    }
  });
}

/** 
 * [getImageList Function]
 * @param accessKey: {{string}}
 * @param secretKey: {{string}}
 * @param bucket：: {{string}}
 */
function getImageList(req, res) {
  const accessKey = req.headers.accesskey || '';
  const secretKey = req.headers.secretkey || '';
  const bucket = req.headers.bucket || '';

  console.log(req)

  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

  if (!Object.keys(req.body).length) {
    req.body = "";
  }
  const accessToken = qiniuUtil.generateAccessToken(mac, "http://rsf.qbox.me/list?bucket=image", req.body)
  request
    .post('http://rsf.qbox.me/list?bucket=image')
    .set('Host', 'rsf.qbox.me')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', accessToken)
    .end((err, resp) => {
      if (resp.status == 200) {
        let data = resp.text.replace(/\\/, "");
        data = JSON.parse(data)
        res.json({
          code: 200,
          data: data.items
        })
      }else{
        res.json({
            code: resp.status,
            msg: JSON.parse(resp.text).error
        })
      }
    });
}


/** 
 * [deleteImage Function]
 * @param accessKey: {{string}}
 * @param secretKey: {{string}}
 * @param bucket: {{string}}
 * @param fileName: {{string}}
 */
function deleteImage(req, res) {
  const accessKey = req.headers.accesskey || '';
  const secretKey = req.headers.secretkey || '';
  const bucket = req.headers.bucket || '';

  const fileName = req.body.fileName || '';

  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  if (!Object.keys(req.body).length) {
    req.body = "";
  }

  const encodeEntry = qiniuUtil.encodedEntry(bucket, fileName);
  const accessToken = qiniuUtil.generateAccessToken(mac, "http://rs.qiniu.com/delete/" + encodeEntry)

  request
    .post("http://rs.qiniu.com/delete/" + encodeEntry)
    .set('Host', 'rs.qiniu.com')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', accessToken)
    .end((err, resp) => {
      if (resp.status == 200) {
        res.json({
          code: 200,
          msg: "删除成功"
        })
      } else {
        res.json({
          code: resp.status,
          msg: JSON.parse(resp.text).error
        })
      }
    });
}

module.exports = {
  renderUploadToken,
  uploadFile,
  getImageInfo,
  getImageList,
  deleteImage
}
