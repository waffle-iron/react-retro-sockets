var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var path = require('path');

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname + '/public'));

app.use(function(request, response) {
  response.sendFile(path.join(__dirname, '/dist/index.html'));
});

io.on('connection', function(client) {
  console.log('client connected!');

  client.on('join', function(data) {
    console.log(data);
  });

  client.on('column', function(data) {
    io.sockets.emit('new-column', data)
  })

  client.on('title', function(data) {
    io.sockets.emit('new-title', data)
  })

  client.on('postit', function(data) {
    io.sockets.emit('new-postit', data)
  })
});

server.listen(8080);
