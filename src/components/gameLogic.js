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

// gameLogic.js

export const determineWinner = (playedCards, trumpSuit) => {
    let winningCard = playedCards[0];
    let winnerIndex = 0;

    playedCards.forEach((playedCard, index) => {
        if (playedCard.card.suit === trumpSuit && winningCard.card.suit !== trumpSuit) {
            winnerIndex = index;
            winningCard = playedCard;
        } else if (
            playedCard.card.suit === winningCard.card.suit &&
            playedCard.card.value > winningCard.card.value
        ) {
            winnerIndex = index;
            winningCard = playedCard;
        }
    });

    return winnerIndex;
};

export const calculateScores = (winnerIndex, teamScores) => {
    const updatedScores = { ...teamScores };

    if (winnerIndex % 2 === 0) {
        updatedScores.team1 += 1;
    } else {
        updatedScores.team2 += 1;
    }

    return updatedScores;
};

export const getRandomSuit = () => {
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    return suits[Math.floor(Math.random() * suits.length)];
};


