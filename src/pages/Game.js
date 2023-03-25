import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Player from '../components/Player';
import { createDeck, shuffleDeck, dealCards, determineWinner, calculateScores, getRandomSuit } from '../components/gameLogic';
import './Game.css';

const Game = () => {
  const { lobbyCode } = useParams();
  const [lobby, setLobby] = useState(null);
  const [error, setError] = useState(null);
  const [teamScores, setTeamScores] = useState({ team1: 0, team2: 0 });
  const [hands, setHands] = useState([]);
  const [trumpSuit, setTrumpSuit] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [round, setRound] = useState(1);
  const [subRound, setSubRound] = useState(1);
  const [playedCards, setPlayedCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [showRoundMessage, setShowRoundMessage] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    setTrumpSuit(randomSuit);
  };


  const playCard = (playerIndex, card) => {
    if (!gameStarted || playerIndex !== currentPlayer) {
      return;
    }

    // Remove the played card from the player's hand
    const newHands = hands.slice();
    newHands[playerIndex] = newHands[playerIndex].filter((c) => c !== card);
    setHands(newHands);

    // Update the played cards state
    setPlayedCards([...playedCards, { playerIndex, card }]);

    // Check if the sub-round has ended
    if (playedCards.length === lobby.players.length - 1) {
      // Determine the winner of the sub-round using the updated determineWinner function
      const winnerIndex = determineWinner(playedCards, trumpSuit);

      // Update the scores (you'll need to update calculateScores to handle a single sub-round)
      const updatedScores = calculateScores(winnerIndex, teamScores);
      setTeamScores(updatedScores);

      // Update the sub-round and clear the played cards state
      setSubRound(subRound + 1);
      setPlayedCards([]);

      // If the sub-round is equal to the round, end the round and update the game state
      if (subRound === round + 5) {
        handleRoundEnd();
      } else {
        // Set the winner of the sub-round as the next starting player
        setCurrentPlayer(winnerIndex);
      }
    } else {
      // Move to the next player
      setCurrentPlayer((currentPlayer + 1) % lobby.players.length);
    }
  };

  const restartGame = () => {
    setRound(1);
    setSubRound(1);
    setPlayedCards([]);
    setTeamScores({ team1: 0, team2: 0 });
    setGameStarted(false);
    setCurrentPlayer(Math.floor(Math.random() * lobby.players.length));
  };

  const playerClassName = (index, totalPlayers) => {
    const baseClass = `player player-${index}`;
    return index === currentPlayer ? `${baseClass} current` : baseClass;
  };


  const handleRoundEnd = () => {
    if (round < 8) {
      setRound(round + 1);
      setSubRound(1);
      setPlayedCards([]);

      setShowRoundMessage(true);
      setTimeout(() => {
        setShowRoundMessage(false);
      }, 2000);

      // Shuffle and deal the cards
      const initialDeck = createDeck(lobby.players.length === 8 ? 2 : 1);
      const shuffledDeck = shuffleDeck(initialDeck);
      const playerHands = dealCards(shuffledDeck, lobby.players, round + 6);
      setHands(playerHands);

      // Set the trump suit using the getRandomSuit function
      setTrumpSuit(getRandomSuit());
    } else {
      // The game has ended
      // You can show a game over message and the final scores
    }
  };


  useEffect(() => {
    const fetchLobby = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/lobby/${lobbyCode}`);
        setLobby(response.data);
      } catch (err) {
        setError('Lobby not found');
      }
    };
    fetchLobby();
  }, [lobbyCode, round]);

  useEffect(() => {
    if (!lobby) return;

    console.log(lobby.players);

    // Shuffle and deal the cards
    const initialDeck = createDeck();
    const shuffledDeck = shuffleDeck(initialDeck);
    const cardsPerPlayer = 5 + round; // 6 cards for round 1, 7 for round 2, ...
    const playerHands = dealCards(shuffledDeck, lobby.players, cardsPerPlayer);
    setHands(playerHands);

    // Set the trump suit (you can change this logic if needed)
    setTrumpSuit(shuffledDeck[0].suit);

    // Randomly select the starting player for the first round
    setCurrentPlayer(Math.floor(Math.random() * lobby.players.length));
    console.log(lobby.players);
  }, [round, lobby]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!lobby) {
    return <div>Loading...</div>;
  }

  return (
    <div className="game-container">
      <h1>Game {lobbyCode}</h1>
      <div className="table-container">
        <div className="table">
          {lobby.players.map((player, index) => (
            <Player
              key={index}
              name={player}
              cards={hands[index]}
              score={0}
              className={`player-${index} ${currentPlayer === index ? 'active-player' : ''}`}
              onCardClick={currentPlayer === index ? playCard.bind(null, index) : undefined}
            />
          ))}
        </div>
        {showRoundMessage && <div className="round-message">Starting Round {round + 1}</div>}
        {/* Display the team scores */}
        <div className="team-scores">
          <div>Team 1: {teamScores.team1}</div>
          <div>Team 2: {teamScores.team2}</div>
        </div>
        <div className="game-info">
        <div className="round-info">Round: {round}</div>
          {trumpSuit && <div className="joker-suit">Joker Suit: {trumpSuit}</div>}
          {!gameStarted && <button className="start-game-btn" onClick={startGame}>Start Game</button>}
          <div className="game-controls">
            <button className="restart-game-btn" onClick={restartGame}>Restart Game</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
