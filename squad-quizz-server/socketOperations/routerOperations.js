const { logger } = require("../util");
const { checkAdmin } = require("./adminOperations");

const goToQuizz = (lobbyId, quizzId, playerId, cb, socket) => {
  logger(
    `go to quizz received for lobby ${lobbyId} by player ${playerId} for quizz ${quizzId}`
  );
  checkAdmin(playerId, lobbyId, () => {
    logger(`goToQuizz ${quizzId} order for lobby ${lobbyId}`);
    socket.broadcast.emit("goToQuizzOrder", lobbyId, quizzId);
    cb();
  });
};

const routerOperations = (socket) => {
  socket.on("goToQuizz", (...args) => goToQuizz(...args, socket));
};

module.exports = { routerOperations };
