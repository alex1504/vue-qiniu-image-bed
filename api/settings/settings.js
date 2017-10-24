module.exports = {
    // 密码散列轮数
    saltRounds: 10,
    // 秘钥
    jsonTokenSecret: "You-can-never-guess-my-secret",
    // 设置token过期时间1小时
    tokenExp: Math.floor(Date.now() / 1000) + 60 * 60,
}