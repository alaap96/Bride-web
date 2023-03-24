const lobbies = new Map();

const createLobby = (lobbyCode, playerCount, playerName) => {
  const lobby = {
    lobbyCode: lobbyCode,
    playerCount: playerCount,
    admin: playerName,
    players: [playerName],
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
  console.log(lobbies)
  console.log("lobby" + lobbies.get(lobbyCode));
  return lobbies.get(lobbyCode);
};

module.exports = {
  createLobby,
  joinLobby,
  getLobby,
};
