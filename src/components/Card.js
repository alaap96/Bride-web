import React from 'react';
import './Card.css';

const Card = ({ suit, value }) => {
  const getSuitSymbol = () => {
    switch (suit) {
      case 'hearts':
        return '♥';
      case 'diamonds':
        return '♦';
      case 'clubs':
        return '♣';
      case 'spades':
        return '♠';
      default:
        return '';
    }
  };

  const getColor = () => {
    if (suit === 'hearts' || suit === 'diamonds') {
      return 'red';
    }
    return 'black';
  };

  return (
    <div className={`card ${suit}`}>
      <div className={`card-value ${getColor()}`}>{value}</div>
      <div className={`card-suit ${getColor()}`}>{getSuitSymbol()}</div>
    </div>
  );
};

export default Card;
