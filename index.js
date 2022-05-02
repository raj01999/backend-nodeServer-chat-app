const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res
    .send(
      `<h1 style="text-align: center; font-size: 5rem; margin-top: 5rem;"><a href="https://raj01999.github.io/-nodeServer-chat-app/">Click Me</a></h1>`
    )
    .status(200);
});

app.get("/favicon.ico", (req, res) => {
  res
    .send(
      `<h1 style="text-align: center; font-size: 5rem; margin-top: 5rem;"><a href="https://raj01999.github.io/-nodeServer-chat-app/">Click Me</a></h1>`
    )
    .status(200);
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-join", (obj) => {
    const name = obj.name;
    const time = obj.time;

    if (name) {
      users[socket.id] = { name, time };
      socket.broadcast.emit("user-join", {
        name: name,
        time: time,
        users: users,
      });

      socket.emit("no-user", users);
    } else {
      socket.emit("no-user", users);
    }
  });

  socket.on("msg-send", (msg) => {
    const obj = users[socket.id];
    if (obj) {
      socket.broadcast.emit("msg-receive", {
        msg: msg,
        name: obj.name,
        users: users,
      });
    } else {
      socket.emit("no-user", users);
    }
  });

  socket.on("disconnect", (msg) => {
    const obj = users[socket.id];
    if (!obj) return;
    delete users[socket.id];
    socket.broadcast.emit("left", { name: obj.name, users: users });
  });
});

server.listen(process.env.PORT || 80, () => {});
