const express = require("express");
const app = express();
const { adminOperations } = require("./socketOperations/adminOperations");
const { routerOperations } = require("./socketOperations/routerOperations");
const { revealOperations } = require("./socketOperations/revealOperations");
const { logger } = require("./util.js");
require("./db.js");

const io = require("socket.io")(8000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  logger(`connected socket: ${socket.id}`);

  routerOperations(socket);

  adminOperations(socket);

  revealOperations(socket);

  setTimeout(() => {
    // 100 second later
    socket.disconnect();
    logger(`disconnected socket : ${socket.id} !`);
  }, 300e3);
});
