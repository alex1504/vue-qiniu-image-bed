var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    nickname: String,
    sex: Number,
    age: Number,
    province: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    token: String
}, {
    timestamps: true
})

// 保存记录前自动生成日期
function genDate(user) {
    console.log(user)
    var currentDate = new Date();
    if (!user.createdAt) user.createdAt = currentDate;
    user.updatedAt = currentDate;
}


UserSchema.pre('save', function(next) {
    genDate(this);
    console.log('pre')
    next();
})


// 为模式添加静态方法
/*userSchema.statics.foo = function() {
    // this指的新建的一条记录或者表中原有的一条记录
    this.name = this.name + '-bar';
    return this.name;
};
*/
// 为模式添加查询函数
/*animalSchema.query.byName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};*/



// 每次对象保存前执行函数  -- 可用于密码存储到数据库前的加密、对比密码、找到具有共同属性的用户等
/*userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});*/

module.exports = mongoose.model('Users', UserSchema)