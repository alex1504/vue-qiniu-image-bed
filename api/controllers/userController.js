/*var mongoose = require('mongoose'),
    User = mongoose.model('Users');*/
var User = require('../models/userModel')
var _ = require('lodash')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var createToken = require('../utils/createToken')
var { jsonTokenSecret, saltRounds } = require('../settings/settings')


exports.getAllUsers = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};

// 注册
exports.createOneUser = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    var token = createToken();

    // 密码加密及保存token
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            req.body = _.assign(req.body, {
                password: hash,
                token: token
            })
            var new_user = new User(req.body);
            new_user.save(function(err, user) {
                if (err) {
                    console.log(err);
                    res.json(err);
                    return;
                };
                res.json(user);
            });
        });
    });
};

exports.getOneUser = function(req, res) {
    var username = req.params.username;
    if (username) {
        User.find({ username: username }, function(err, user) {
            if (err) throw err;
            res.json(user)
        });
    }
};

exports.updateOneUserById = function(req, res) {
    var userId = req.params.userId;
    var username = req.body.username;
    User.findOneAndUpdate({ _id: userId }, { username: username }, function(err, user) {
        if (err) {
            console.log(err);
            res.json(err);
            return;
        };
        res.json(user);
    });
};

exports.deleteOneUser = function(req, res) {

};
// 登录
exports.login = function(req, res) {
    var token = req.body.token;
    var username = req.body.username;
    var password = req.body.password;
    // 用户名不能为空
    if (!username) {
        res.json({
            'code': 1,
            'msg': 'Missing username'
        })
        return;
    }
    // 密码不能为空
    if (!password) {
        res.json({
            'code': 1,
            'msg': 'Missing password'
        })
        return;
    }
    User.findOne({ username: username }, function(err, user) {
        if (err) console.log(err);
        // 用户名不存在
        if (!user) {
            res.json({
                'code': 1,
                'msg': 'Username is not exists'
            })
            return;
        }
        bcrypt.compare(password, user.password, function(err, isMatch) {
            if (err) console.log(err);
            // 用户名和密码不匹配
            if (!isMatch) {
                res.json({
                    'code': 1,
                    'msg': 'Username does not matches password'
                })
                return;
            }
            // 为何移除不了password？
            // _.unset(user, 'password')

            // 更新token并添加code
            /*_.assign(user, {
                token: createToken(),
                code: 0
            });*/
            var newToken = createToken();
            user.token = newToken;
            user.save(function(err) {
                if (err) throw err;
                res.json({
                    code: 0,
                    username: user.username,
                    avatar: user.avatar,
                    token: newToken
                });
            });

        });

    })
}

// 登出
/*exports.logout = function(req, res) {
    var username = req.body.username;
    User.findOne({ username: username }, function(err, user) {
        if (err) console.log(err);
        // 更新token
        user = _.assign(user, createToken());
        res.json({
            'msg': 'Logout successfully'
        })
    })
}*/

// 验证是否token有效，若有效，则处于登录状态
exports.checkToken = function(req, res) {
    var username = req.body.username;
    var token = req.body.token;
    if (!token) {
        res.json({
            'code': 1,
            'msg': 'Missing param token'
        })
        return;
    }
    if (!username) {
        res.json({
            'code': 1,
            'msg': 'Missing param username'
        })
        return;
    }
    User.findOne({ username: username }, function(err, user) {
        if (err) console.log(err);
        jwt.verify(token, jsonTokenSecret, function(err, decoded) {
            if (err) {
                res.json({
                    'code': 1,
                    'msg': 'Your token is invalid'
                });
                return;
            };
            res.json({
                'code': 0,
                'msg': 'Your token is valid'
            })
        });
    })
}




/*JSON验证， 参数：待验证token，秘钥，回调函数*/
function validateToken(token, username) {
    if (!token) {
        res.json({
            'msg': 'Missing param token'
        })
        return;
    }
    if (!username) {
        res.json({
            'msg': 'Missing param username'
        })
        return;
    }
    User.findOne({ username: username }, function(err, user) {
        if (err) console.log(err);
        // 用户不存在
        if (!user) {
            res.json({
                'msg': 'username is not exists'
            })
            return;
        }
        jwt.verify(token, jsonTokenSecret, function(err, decoded) {
            if (err) {
                res.json(err);
                return;
            };
            res.end();
        });


    })

}