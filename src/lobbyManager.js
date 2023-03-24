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

const joinLobby = (lobbyCode, playerName) => {
  const lobby = lobbies.get(lobbyCode);
  if (!lobby || lobby.players.length >= lobby.playerCount) {
    return null;
  }

  lobby.players.push(playerName);
  return lobby;
};

const getLobby = (lobbyCode) => {
  return lobbies.get(lobbyCode);
};

export default {
  createLobby,
  joinLobby,
  getLobby,
};
