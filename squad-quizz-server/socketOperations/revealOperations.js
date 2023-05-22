const { logger } = require("../util");
const { checkAdmin } = require("./adminOperations");

const checkReveal = (fullId, cb) => {
  logger(`check reveal for ${fullId}`);

  // TODO: add db support for reveal
  // const isQuestionRevealed = accessDb(fullId, "question");
  // const isOptionsRevealed = accessDb(fullId, "options");
  cb([false, false]);
};

const revealQuestion = (lobbyId, quizzId, playerId, cb, socket) => {
  logger(
    `reveal question received for lobby ${lobbyId} by player ${playerId} for quizz ${quizzId}`
  );
  checkAdmin(playerId, lobbyId, () => {
    socket.broadcast.emit("reveal_question_order", quizzId, () =>
      logger(`reveal_question_order for quizz ${quizzId}`)
    );
    cb();
  });
};

const revealOptions = (lobbyId, quizzId, playerId, cb, socket) => {
  logger(
    `reveal options received for lobby ${lobbyId} by player ${playerId} for quizz ${quizzId}`
  );
  checkAdmin(lobbyId, playerId, () => {
    socket.broadcast.emit("reveal_options_order", quizzId, () =>
      logger(`reveal_options_order for quizz ${quizzId}`)
    );
    cb();
  });
};

const revealOperations = (socket) => {
  socket.on("check_reveal", checkReveal);

  socket.on("reveal_question", (...args) => revealQuestion(...args, socket));

  socket.on("reveal_options", (...args) => revealOptions(...args, socket));
};

module.exports = { revealOperations };
