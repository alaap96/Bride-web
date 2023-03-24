const lobbies = new Map();

const createLobby = (lobbyCode, playerCount) => {
  const lobby = {
    lobbyCode,
    playerCount,
    players: [],
  };

  lobbies.set(lobbyCode, lobby);
  return lobby;
};

const joinLobby = (lobbyCode, player) => {
  const lobby = lobbies.get(lobbyCode);
  if (!lobby || lobby.players.length >= lobby.playerCount) {
    return null;
  }

  lobby.players.push(player);
  return lobby;
};

const getLobby = (lobbyCode) => {
  return lobbies.get(lobbyCode);
};

module.exports = {
  createLobby,
  joinLobby,
  getLobby,
};
