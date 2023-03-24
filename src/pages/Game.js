import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Player from '../components/Player';
import { createDeck, shuffleDeck, dealCards, determineWinner, calculateScores } from '../components/gameLogic';
import './Game.css';

const Game = () => {
  const { lobbyCode } = useParams();
  const [lobby, setLobby] = useState(null);
  const [error, setError] = useState(null);
  const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 });
  const [deck, setDeck] = useState([]);
  const [hands, setHands] = useState([]);
  const [trumpSuit, setTrumpSuit] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [round, setRound] = useState(1);
  const [subRound, setSubRound] = useState(1);
  const [playedCards, setPlayedCards] = useState([]);
  const [winnerIndex, setWinnerIndex] = useState(null);

  useEffect(() => {
    const fetchLobby = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/lobby/${lobbyCode}`);
        console.log(response.data.players);
        setLobby(response.data);

        // Shuffle and deal the cards
        const initialDeck = createDeck();
        const shuffledDeck = shuffleDeck(initialDeck);
        const cardsPerPlayer = 5 + round; // 6 cards for round 1, 7 for round 2, ...
        const playerHands = dealCards(shuffledDeck, response.data.players, cardsPerPlayer);
        setHands(playerHands);

        // Set the trump suit (you can change this logic if needed)
        setTrumpSuit(shuffledDeck[0].suit);

        // Randomly select the starting player for the first round
        setCurrentPlayer(Math.floor(Math.random() * response.data.players.length));
      } catch (err) {
        setError('Lobby not found');
      }
    };

    fetchLobby();
  }, [lobbyCode, round]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!lobby) {
    return <div>Loading...</div>;
  }

  const playerClassName = (index, totalPlayers) => {
    const angle = (2 * Math.PI) / totalPlayers;
    return `player player-${index}`;
  };

  const playCard = (playerIndex, card) => {
    // Update the played cards state
    setPlayedCards([...playedCards, { playerIndex, card }]);

    // Check if the sub-round has ended
    if (playedCards.length === lobby.players.length - 1) {
      // Determine the winner of the sub-round using the updated determineWinner function
      const winnerIndex = determineWinner(playedCards, trumpSuit);

      // Update the scores (you'll need to update calculateScores to handle a single sub-round)
      const updatedScores = calculateScores(winnerIndex, teamScores);
      setTeamScores(updatedScores);

      if (subRound < round) {
        setCurrentPlayer(winnerIndex);
        setSubRound(subRound + 1);
        setPlayedCards([]);
      } else {
        handleRoundEnd();
      }
    }
  }
};

const handleRoundEnd = () => {
  if (round < 8) {
    setRound(round + 1);
    setSubRound(1);
    setPlayedCards([]);

    // Shuffle and deal the cards
    const initialDeck = createDeck(lobby.players.length === 8 ? 2 : 1);
    const shuffledDeck = shuffleDeck(initialDeck);
    const playerHands = dealCards(shuffledDeck, lobby.players, round + 6);
    setHands(playerHands);

    // Set the trump suit (you can change this logic if needed)
    setTrumpSuit(shuffledDeck[0].suit);
  } else {
    // The game has ended
    // You can show a game over message and the final scores
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
            cards={hands[index]} // Use the cards from hands
            score={0} // Use real score from your game state when available
            className={playerClassName(index, lobby.players.length)}
          />
        ))}
      </div>
      {/* Display the team scores */}
      <div className="team-scores">
        <div>Team 1: {teamScores.team1}</div>
        <div>Team 2: {teamScores.team2}</div>
      </div>
    </div>
  </div>
);
};

export default Game;
