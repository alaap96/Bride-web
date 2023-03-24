import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Player from '../components/Player';
import './Game.css';

const Game = () => {
  const { lobbyCode } = useParams();
  const [lobby, setLobby] = useState(null);
  const [error, setError] = useState(null);  

  useEffect(() => {
    const fetchLobby = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/lobby/${lobbyCode}`);
        console.log(response.data.players);
        setLobby(response.data);
      } catch (err) {
        setError('Lobby not found');
      }
    };

    fetchLobby();
  }, [lobbyCode]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!lobby) {
    return <div>Loading...</div>;
  }

  const playerClassName = (index, totalPlayers) => {
    if (totalPlayers <= 4) {
      return `player-${index}`;
    } else {
      return `player-8-${index}`;
    }
  };

  return (
    <div className="game-container">
      <h1>Game {lobbyCode}</h1>
      <div className="table-container">
        <div className="table">
          {lobby.players.map((player, index) => (
            <Player
              key={index}
              name={player}
              cards={['X', 'Y', 'Z']} // For now, we're using dummy cards
              className={playerClassName(index, lobby.players.length)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
