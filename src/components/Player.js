import React from 'react';
import Card from './Card';
import './Player.css';

const Player = ({ name, cards, score, className }) => {
  return (
    <div className={`player ${className}`}>
      <div className="player-cards">
        {cards.map((card, index) => (
          <Card key={index} suit={card.suit} value={card.value} />
        ))}
      </div>
      <div className="player-score">Score: {score}</div>
      <div className="player-name">{name}</div>
    </div>
  );
};

export default Player;
