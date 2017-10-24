var Post = require('../models/postModel')

var posterDefault = [
    "http://upyun.huzerui.com/img/11.jpg",
    "http://upyun.huzerui.com/img/12.jpg",
    "http://upyun.huzerui.com/img/13.jpg",
    "http://upyun.huzerui.com/img/14.jpg",
    "http://upyun.huzerui.com/img/15.japg",
    "http://upyun.huzerui.com/img/16.jpg",
    "http://upyun.huzerui.com/img/17.jpg",
    "http://upyun.huzerui.com/img/18.jpg",
    "http://upyun.huzerui.com/img/19.jpg",
    "http://upyun.huzerui.com/img/20.jpg",
    "http://upyun.huzerui.com/img/21.jpg",
    "http://upyun.huzerui.com/img/22.jpg",
    "http://upyun.huzerui.com/img/23.jpg",
    "http://upyun.huzerui.com/img/24.jpg",
    "http://upyun.huzerui.com/img/25.jpg",
    "http://upyun.huzerui.com/img/26.jpg",
    "http://upyun.huzerui.com/img/27.jpg",
    "http://upyun.huzerui.com/img/28.jpg",
    "http://upyun.huzerui.com/img/29.jpg",
    "http://upyun.huzerui.com/img/30.jpg",
    "http://upyun.huzerui.com/img/31.jpg",
    "http://upyun.huzerui.com/img/32.jpg",
    "http://upyun.huzerui.com/img/33.jpg",
    "http://upyun.huzerui.com/img/34.jpg",
    "http://upyun.huzerui.com/img/35.jpg",
    "http://upyun.huzerui.com/img/36.jpg",
    "http://upyun.huzerui.com/img/37.jpg",
    "http://upyun.huzerui.com/img/38.jpg",
    "http://upyun.huzerui.com/img/39.jpg",
    "http://upyun.huzerui.com/img/40.jpg",
    "http://upyun.huzerui.com/img/41.jpg",
    "http://upyun.huzerui.com/img/42.jpg",
    "http://upyun.huzerui.com/img/43.jpg",
    "http://upyun.huzerui.com/img/44.jpg",
    "http://upyun.huzerui.com/img/45.jpg",
    "http://upyun.huzerui.com/img/46.jpg",
    "http://upyun.huzerui.com/img/47.jpg",
    "http://upyun.huzerui.com/img/48.jpg",
    "http://upyun.huzerui.com/img/49.jpg",
    "http://upyun.huzerui.com/img/50.jpg",
];

// 发布文章
exports.createPost = function(req, res) {
    if (!req.body.poster) {
        req.body.poster = posterDefault[parseInt(Math.random() * posterDefault.length)];
    }
    var new_post = new Post(req.body);
    new_post.save(function(err, post) {
        if (err) {
            console.log(err);
            res.json(err);
            return;
        };
        res.json(post);
    });
};


// 获取所有文章
exports.getAllPosts = function(req, res) {
    var page = typeof req.query.page == 'undefined' ? 1 : req.query.page; // 默认返回第一页数据
    var limit = typeof req.query.limit == 'undefined' ? 5 : req.query.limit; // 默认每页10条记录
    Post.find({}, function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    }).sort({ 'createdAt': -1 }).skip((page - 1) * limit).limit(limit);
};

// 通过id获取文章
exports.getPostById = function(req, res) {
    if (!req.params.id) {
        res.json({
            code: 1,
            msg: 'Post id is required'
        })
        return;
    }
    Post.find({ _id: req.params.id }, function(err, post) {
        if (err)
            res.send(err);
        res.json(post);
    })
};

// star或取消star
exports.toggleStar = function(req, res) {
    var postId = req.body.postId
    var username = req.body.username
    if (!postId) {
        res.json({
            code: 1,
            msg: 'id is required'
        })
        return;
    }
    if (!username) {
        res.json({
            code: 1,
            msg: 'username is required'
        })
        return;
    }

    Post.findById({ _id: postId }, function(err, post) {
        if (err)
            res.send(err);

        var starBy = post.starBy;
        var _isExist = function(value, arr) {
            return arr.indexOf(value) == -1 ? false : true
        }

        // 若starBy数组中含有用户名，则触发取消star；或者触发star
        if (!_isExist(username, starBy)) {
            post.star += 1;
            post.starBy.push(username);
        } else {
            post.star -= 1;
            var index = starBy.indexOf(username);
            post.starBy.splice(index, 1);
        }

        post.save(function(err) {
            if (err) {
                console.log(err);
                res.json({
                    'code': 1,
                    'msg': err
                })
                return;
            };
            res.json({
                code: 0,
                msg: 'Success'
            })
        });

    })

};