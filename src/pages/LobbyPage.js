import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LobbyPage = () => {
  const { lobbyCode } = useParams();
  const [lobby, setLobby] = useState(null);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [intervalId, setIntervalId] = useState(null);

  const navigate = useNavigate();
  const isAdmin = playerName === lobby?.admin;
  const allPlayersJoined = lobby?.players.length === lobby?.playerCount;

  const handleStartGame = () => {
    // You can implement the game starting logic here or redirect to a new route
    navigate(`/game/${lobbyCode}`);
  };

  useEffect(() => {
    const storedPlayerName = localStorage.getItem('playerName');
    if (storedPlayerName) {
      setPlayerName(storedPlayerName);
    }

    const fetchLobby = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/lobby/${lobbyCode}`);
        setLobby(response.data);
      } catch (err) {
        setError('Lobby not found');
      }
    };

    fetchLobby();

    // Set up polling
    const newIntervalId = setInterval(() => {
      fetchLobby();
    }, 2000);

    setIntervalId(newIntervalId);

    // Clean up the interval when the component is unmounted
    return () => {
      clearInterval(newIntervalId);
    };
  }, [lobbyCode]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!lobby) {
    return <div>Loading...</div>;
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

      {isAdmin && (
        <button onClick={handleStartGame} disabled={!allPlayersJoined}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default LobbyPage;
