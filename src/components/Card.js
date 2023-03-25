import React from 'react';
import './Card.css';

const Card = ({ suit, value, onClick }) => {
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
    <div className={`card ${suit} ${value}`} onClick={onClick}>
      <div className={`card-value ${getColor()}`}>{value}</div>
      <div className={`card-suit ${getColor()}`}>{getSuitSymbol()}</div>
    </div>
  );
};

export default Card;
