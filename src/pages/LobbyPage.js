import React from 'react';
import { useParams } from 'react-router-dom';
import lobbyManager from '../lobbyManager';

const LobbyPage = () => {
  const { lobbyCode } = useParams();
  const lobby = lobbyManager.getLobby(lobbyCode);

  if (!lobby) {
    return <div>Lobby not found</div>;
  }

  return (
    <div>
      <h1>Lobby {lobbyCode}</h1>
      <h2>Players ({lobby.players.length}/{lobby.playerCount})</h2>
      <ul>
        {lobby.players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default LobbyPage;
