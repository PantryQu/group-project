const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('message', (msg) => {
  io.emit('message', msg);
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});