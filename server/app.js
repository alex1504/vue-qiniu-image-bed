var app = require('express')()
var server = require('http').createServer(app)
var cors = require('cors')
    // var io = require('socket.io').listen(server);

var port = process.env.PORT || 3000
var bodyParser = require('body-parser')

// 应用层中间件
app.use(cors());
app.all('*', function(req, res, next) {
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
    .get(function(req, res,next) {
        res.json({
            code: 200,
            msg: "Hellow, this is jerry's qiniu server",
            node_version: "7.1.0"
        })
    });

var qiniuRoute = require('./api/routes/qiniuRoute')
qiniuRoute(app)

/* 
var users = [];
io.sockets.on('connection', function (socket) {
  socket.emit('a', {
    hello: 'world'
  });


  socket.on('online', function (data) {
    var username = data.username;
    var avatar = data.avatar;
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
    var say = data.say;
    var avatar = data.avatar;
    socket.name = say;
    io.sockets.emit('message', {
      message: say,
      avatar: avatar
    });
  });
}); */

server.listen(port);

console.log(`You server now listening on port: ${port} `);