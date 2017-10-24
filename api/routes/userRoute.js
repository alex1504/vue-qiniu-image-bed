module.exports = function(app) {
    var tokenAuth = require('../middlewares/tokenAuth');
    var users = require('../controllers/userController');

    app.route('/users')
        .get(users.getAllUsers)
        // 注册
        .post(users.createOneUser);

    app.route('/users/:username')
        .get(users.getOneUser)
        .put(tokenAuth, users.updateOneUserById)
        .delete(tokenAuth, users.deleteOneUser);

    app.route('/session')
        // 登录
        .post(users.login)

    app.route('/session/check')
        // 判断token是否有效
        .post(users.checkToken)
}