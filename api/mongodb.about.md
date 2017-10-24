```javascript
1、查找所有：
User.find({}, function(err, users) {
  if (err) throw err;
  console.log(users);
});
2、查找一条：
User.find({ username: 'starlord55' }, function(err, user) {
  if (err) throw err;
  console.log(user);
});
3、通过id查找：
User.findById(1, function(err, user) {
  if (err) throw err;
  console.log(user);
});
4、特殊查询：--  见mongodb查询语法：https://docs.mongodb.com/manual/reference/operator/query/
如：获取一个月前至今创建的用户
var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);
User.find({ admin: true }).where('created_at').gt(monthAgo).exec(function(err, users) {
  if (err) throw err;
  console.log(users);
});
5、更新
User.findById(1, function(err, user) {
  if (err) throw err;
  
  // change the users location
  user.location = 'uk';

  // save the user
  user.save(function(err) {
    if (err) throw err;
    console.log('User successfully updated!');
  });

});
6、查找并更新（更简洁的方式）
User.findOneAndUpdate({ username: 'starlord55' }, { username: 'starlord88' }, function(err, user) {
  if (err) throw err;
  console.log(user);
});
7、通过Id查找并更新
User.findByIdAndUpdate(4, { username: 'starlord88' }, function(err, user) {
  if (err) throw err;
  console.log(user);
});
8、删除
User.find({ username: 'starlord55' }, function(err, user) {
  if (err) throw err;

  // delete him
  user.remove(function(err) {
    if (err) throw err;

    console.log('User successfully deleted!');
  });
});
9、查找并删除
// find the user with username
User.findOneAndRemove({ username: 'starlord55' }, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});
10、通过id查找并删除
// find the user with id 4
User.findByIdAndRemove(4, function(err) {
  if (err) throw err;

  // we have deleted the user
  console.log('User deleted!');
});



```