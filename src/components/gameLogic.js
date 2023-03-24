const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const createDeck = () => {
  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
};

export const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const dealCards = (deck, players, cardsPerPlayer) => {
    const hands = Array.from({ length: players.length }, () => []);
    for (let i = 0; i < cardsPerPlayer * players.length; i++) {
      hands[i % players.length].push(deck[i]);
    }
    return hands;
};  

export const determineWinner = (cards, trumpSuit) => {
  // Implement the logic to determine the winner of each sub-round based on the rules
};

export const calculateScores = (rounds) => {
  // Implement the logic to calculate the scores for each team
};
