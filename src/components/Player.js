import React from 'react';
import './Player.css';

const Player = ({ name, cards, className }) => {
  return (
    <div className={className}>
      <div className="player-info">
        <span>{name}</span>
      </div>
      <div className="player-cards">
        {cards.map((card, index) => (
          <span key={index} className={`card card-${index}`}>
            {card}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Player;
