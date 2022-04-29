const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const router = require("./router");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());
app.use(router);

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;

    socket.broadcast.emit("user-joined", name);
  });

  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

server.listen(process.env.PORT || 3000, () =>
  console.log(`Server has started.`)
);
