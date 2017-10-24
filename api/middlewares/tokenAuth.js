var jwt = require('jsonwebtoken')
var User = require('../models/userModel')
var { jsonTokenSecret } = require('../settings/settings')

module.exports = function(req, res, next) {
    var username = req.body.username;
    var token = req.body.token;
    User.findOne({ username: username }, function(err, user) {
        if (err) {
            console.log(err);
            return;
        };
        jwt.verify(token, jsonTokenSecret, function(err, decoded) {
            if (err) {
                res.json({
                    code: 1,
                    msg: 'Token is not valid'
                });
                return;
            };
            next();
        });
    })
}