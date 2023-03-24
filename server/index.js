const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createLobby, joinLobby, getLobby } = require('./lobbies/lobbyManager');

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://127.0.0.1:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.post('/api/create-lobby', (req, res) => {
  const { lobbyCode, playerCount, playerName } = req.body;
  const lobby = createLobby(lobbyCode, playerCount, playerName);
  res.status(200).json(lobby);
});

app.post('/api/join-lobby', (req, res) => {
  const { lobbyCode, playerName } = req.body;
  const lobby = joinLobby(lobbyCode, playerName);

  // Emit lobby update event
  if (lobby) {
    res.json({ lobbyCode });
  } else {
    res.status(400).json({ message: 'Lobby not found or full' });
  }
});

app.get('/api/lobby/:lobbyCode', (req, res) => {
  const lobby = getLobby(req.params.lobbyCode);
  if (lobby) {
    res.json(lobby);
  } else {
    res.status(404).json({ message: 'Lobby not found' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
