module.exports = function(app) {
    var tokenAuth = require('../middlewares/tokenAuth');
    var posts = require('../controllers/postController');

    app.route('/posts')
        //获取所有文章
        .get(posts.getAllPosts)
        // 发布文章
        .post(tokenAuth, posts.createPost);

    app.route('/posts/:id')
        .get(posts.getPostById)

    app.route('/posts/star')
        .post(posts.toggleStar)
}