var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
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
