const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST"],        // Allow these HTTP methods
    credentials: true                // Allow credentials (cookies, authorization headers, etc.)
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');

  // Broadcast the received data to all clients except the sender
  socket.on('editor-data', (data) => {
    console.log('Received data:', data);
    // Broadcast data to all clients except the sender
    socket.broadcast.emit('editor-data', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(8080, () => {
  console.log('WebSocket server is running on port 8080');
});
