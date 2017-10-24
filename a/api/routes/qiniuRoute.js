module.exports = function (app) {
  const qiniu = require('../controllers/qiniuController')

  app.route('/qiniuAuth')
    .post(qiniu.renderUploadToken);

  app.route('/upload')
    .post(qiniu.uploadFile);

  app.route('/imageInfo')
    .post(qiniu.getImageInfo);

  app.route('/imageList')
    .post(qiniu.getImageList);

  app.route('/image/delete')
    .post(qiniu.deleteImage);
}
