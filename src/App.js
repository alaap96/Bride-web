import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LobbyPage from './pages/LobbyPage';
import Game from './pages/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lobby/:lobbyCode" element={<LobbyPage />} />
        <Route path="/game/:lobbyCode" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
