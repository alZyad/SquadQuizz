const { logger } = require("../util");

var lobbies = []; // use db

const generatePlayerId = () => {
  // TODO: use db auto increment ?
  return Math.floor(Math.random() * 9999) + 1;
};

const generateLobbyId = () => {
  // TODO: use db auto increment ?
  const lobbyIdNumber = Math.floor(Math.random() * 999) + 1;
  const lobbyIdString = String(lobbyIdNumber).padStart(3, "0");
  return lobbyIdString;
};

const createLobbyLocal = (playerId, lobbyId) =>
  lobbies.push({ playerId, lobbyId });

const createLobby = (cb) => {
  const lobbyId = generateLobbyId();
  const playerId = String(generatePlayerId());
  logger(`new lobby ${lobbyId} by player ${playerId}`);

  createLobbyLocal(playerId, lobbyId);
  cb(playerId, lobbyId);
};

const checkAdminLocal = ({ playerId, lobbyId }) => {
  const isAdmin = lobbies.some(
    (lobby) => lobby.playerId === playerId && lobby.lobbyId === lobbyId
  );
  return isAdmin;
};

const checkAdmin = (playerId, lobbyId, cb) => {
  const isAdmin = checkAdminLocal({ playerId, lobbyId });
  if (isAdmin) {
    logger(`lobby ${lobbyId} admin check successfull for player ${playerId}`);
  } else {
    logger(`lobby ${lobbyId} admin check failure for player ${playerId}`);
  }
  cb(isAdmin);
};

const adminOperations = (socket) => {
  socket.on("new_lobby", createLobby);

  socket.on("check_admin", checkAdmin);
};

module.exports = { adminOperations, checkAdmin };
