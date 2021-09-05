const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:8000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

let animationInterval;
let sequenceIndex = 0;
const sequence = [
  [["red", "green", "blue"]],
  [["blue", "red", "green"]],
  [["green", "blue", "red"]],
];

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(port, (err) => {
  if (err) throw err;
  console.log(`> [${env}] Ready on http://localhost:${port}`);
});

// socket.io server
io.on('connection', (socket) => {
  console.log('Someone connected');

  // TODO: Update creator UI with list of connected pixels.
  socket.on('connectedPosition', (data) => {
    const {row, col} = data;
    console.log(`Connected: r: ${row} c: ${col}`)
  });

  socket.on('prediction', (data) => {
    console.log(data);
    // lastPrediction = data;
    // socket.broadcast.emit('prediction', data);
  });
  
  // TODO: Pull sequence data from frontend
  socket.on('animationStep', (data) => {
    sequenceIndex = (sequenceIndex + 1) % sequence.length;
  });

  if (!animationInterval) {
    console.log("Interval", animationInterval);
    animationInterval = setInterval(() => {
      sequenceIndex = (sequenceIndex + 1) % sequence.length;
      console.log("Sequence Index", sequenceIndex);
      console.log("Socket Count", io.engine.clientsCount);
  
      io.emit("newFrame", {
        frame: sequence[sequenceIndex],
      });
    }, 2000);
  } else {
    console.log("Interval already set");
  }
  
  socket.on('disconnect', () => {
    console.log("Socket disconnected");
    clearInterval(interval);
  });
});
