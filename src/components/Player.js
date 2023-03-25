import React from 'react';
import Card from './Card';
import './Player.css';

const Player = ({ name, cards = [], score, className, onCardClick }) => {
  return (
    <div className={`player ${className}`}>
      <div className="player-cards">
        {cards.map((card, index) => (
          <Card
            key={index}
            {...card}
            onClick={() => onCardClick && onCardClick(card)}
          />
        ))}
      </div>
      <div className="player-score">Score: {score}</div>
      <div className="player-name">{name}</div>
    </div>
  );
};

export default Player;
