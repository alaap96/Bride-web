import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const HomePage = () => {
  const [playerCount, setPlayerCount] = useState(4);
  const [lobbyCode, setLobbyCode] = useState('');
  const [playerName, setPlayerName] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = generateRandomString(6);
    setLobbyCode(code);
  
    try {
      const response = await fetch('https://alaap96-ominous-lamp-pj6gq5p95qqh946x-3000.preview.app.github.dev/api/create-lobby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lobbyCode: code,
          playerCount: playerCount,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Lobby created', data);
        navigate(`/lobby/${data.lobbyCode}`);
      } else {
        throw new Error('Failed to create lobby');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const [joinLobbyCode, setJoinLobbyCode] = useState('');

  const handleJoinLobby = async (e) => {
    e.preventDefault();

    const response = await fetch('https://alaap96-ominous-lamp-pj6gq5p95qqh946x-3000.preview.app.github.dev/api/join-lobby', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lobbyCode: joinLobbyCode, playerName }),
    });

    if (response.ok) {
      navigate(`/lobby/${joinLobbyCode}`);
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div>
      <h1>Create a Lobby</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Players:
          <select
            value={playerCount}
            onChange={(e) => setPlayerCount(parseInt(e.target.value, 10))}
          >
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </label>
        <button type="submit">Create Lobby</button>
      </form>
      {lobbyCode && <div>Lobby Code: {lobbyCode}</div>}

      <form onSubmit={handleJoinLobby}>
        <label>
          Join a Lobby:
          <input
            type="text"
            value={joinLobbyCode}
            onChange={(e) => setJoinLobbyCode(e.target.value)}
            maxLength={6}
          />
        </label>
        <label>
          Player Name:
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
          />
        </label>

        <button type="submit">Join Lobby</button>
      </form>
    </div>
  );
};

export default HomePage;

