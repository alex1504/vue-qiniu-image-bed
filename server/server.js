const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
// const io = require('socket.io').listen(server);
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')


// 应用层中间件
app.use(cors());
app.all('*', function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  next();
});
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// 应用层路由
app.route('/')
  .get(function (req, res, next) {
    res.json({
      code: 200,
      msg: "Hellow, this is jerry's qiniu server",
      node_version: "7.1.0"
    })
  });

const qiniuRoute = require('./api/routes/qiniuRoute')
qiniuRoute(app)

/* 
const users = [];
io.sockets.on('connection', function (socket) {
  socket.emit('a', {
    hello: 'world'
  });


  socket.on('online', function (data) {
    const username = data.username;
    const avatar = data.avatar;
    socket.name = username;
    if (users.indexOf(username) == -1) {
      users.push(username)
    }
    io.sockets.emit('online', {
      users: users,
      user: username,
      avatar: avatar
    });
  });

  socket.on('message', function (data) {
    const say = data.say;
    const avatar = data.avatar;
    socket.name = say;
    io.sockets.emit('message', {
      message: say,
      avatar: avatar
    });
  });
}); */

app.listen(port);
console.log(`Server running on port ${port}`); 

