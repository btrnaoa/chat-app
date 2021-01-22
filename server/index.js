const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, '../client/build')));

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('chat message', (msg) => {
    console.log(msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
