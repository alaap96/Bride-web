const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'https://alaap96-ominous-lamp-pj6gq5p95qqh946x-3000.preview.app.github.dev' }));


const lobbies = {};

app.post('/api/create-lobby', (req, res) => {
  const { lobbyCode, playerCount } = req.body;
  const lobby = createLobby(lobbyCode, playerCount);
  res.status(201).json(lobby);
});

app.post('/api/join-lobby', (req, res) => {
  const { lobbyCode, playerName } = req.body;
  const lobby = lobbies[lobbyCode];

  if (lobby && lobby.players.length < lobby.playerCount) {
    lobby.players.push(playerName);
    res.json({ lobbyCode });
  } else {
    res.status(400).json({ message: 'Lobby not found or full' });
  }
});

app.get('/api/lobby/:lobbyCode', (req, res) => {
  const lobby = lobbies[req.params.lobbyCode];
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
