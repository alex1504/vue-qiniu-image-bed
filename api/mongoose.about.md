```javascript
## model相关
// 为模式添加静态方法
userSchema.statics.foo = function() {
    // this指的新建的一条记录或者表中原有的一条记录
    this.name = this.name + '-bar';
    return this.name;
};

// 为模式添加查询函数
userSchema.query.byName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};

// 每次对象保存前执行函数  -- 可用于密码存储到数据库前的加密、对比密码、找到具有共同属性的用户、验证token等
userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});



```