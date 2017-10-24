var { jsonTokenSecret, saltRounds, tokenExp } = require('../settings/settings')
var jwt = require('jsonwebtoken')

module.exports = function() {
    var token = jwt.sign({
        exp: tokenExp
    }, jsonTokenSecret);

    return token;
}