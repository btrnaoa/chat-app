const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, '../client/build')));

let users = [];
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('user connect', (user) => {
    users.push(user);
    io.emit('users', users);
    socket.broadcast.emit('chat message', {
      heading: `${user.name} has joined`,
      time: Date.now(),
    });
  });
  socket.on('disconnect', () => {
    users = users.filter((user) => user.id !== socket.id);
    io.emit('users', users);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
