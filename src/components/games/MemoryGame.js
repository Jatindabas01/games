import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const GameStats = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const Stat = styled.div`
  background-color: var(--white);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  strong {
    color: var(--primary-color);
    font-weight: 600;
  }
`;

const GameBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  max-width: 500px;
  width: 100%;
`;

const Card = styled.div`
  aspect-ratio: 1 / 1;
  background-color: ${props => (props.flipped ? 'var(--white)' : 'var(--primary-color)')};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: ${props => (props.flipped || props.matched || props.disabled ? 'not-allowed' : 'pointer')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
  transform-style: preserve-3d;
  position: relative;
  
  &:hover {
    box-shadow: ${props => (props.flipped || props.matched || props.disabled ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 6px 12px rgba(0, 0, 0, 0.15)')};
    transform: ${props => (props.flipped ? 'rotateY(180deg)' : 'rotateY(0) scale(1.05)')};
  }
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  border-radius: 8px;
  transform: rotateY(0deg);
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--white);
  border-radius: 8px;
  transform: rotateY(180deg);
  font-size: 2rem;
  border: ${props => (props.matched ? '3px solid #4CAF50' : 'none')};
`;

const GameControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const MemoryGame = () => {
  const emojis = ['🍎', '🍌', '🥝', '🍓', '🍇', '🍊', '🍋', '🍍'];
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(0);
  let timerInterval;

  // Initialize the game
  const initGame = () => {
    // Create pairs of cards and shuffle them
    const cardPairs = [...emojis, ...emojis]
      .map((emoji, index) => ({ id: index, emoji, matched: false }))
      .sort(() => Math.random() - 0.5);
    
    setCards(cardPairs);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setTimer(0);
    setGameOver(false);
    setGameStarted(true);
  };

  // Start timer when game begins
  useEffect(() => {
    if (gameStarted && !gameOver) {
      timerInterval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }
    
    return () => clearInterval(timerInterval);
  }, [gameStarted, gameOver]);
  
  // Check for game completion
  useEffect(() => {
    if (matchedPairs.length === emojis.length && gameStarted) {
      clearInterval(timerInterval);
      setGameOver(true);
    }
  }, [matchedPairs, gameStarted]);

  // Handle card flipping
  const handleCardClick = (index) => {
    // Don't allow clicking if:
    // - Card is already flipped
    // - Card is already matched
    // - More than 1 card is already flipped (waiting for match check)
    // - Game is disabled
    if (flippedIndices.includes(index) || matchedPairs.includes(cards[index].emoji) || flippedIndices.length > 1 || disabled) {
      return;
    }
    
    // Add the clicked card index to flipped indices
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    
    // If we have flipped 2 cards, check for a match
    if (newFlippedIndices.length === 2) {
      setMoves(moves + 1);
      setDisabled(true);
      
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (cards[firstIndex].emoji === cards[secondIndex].emoji) {
        // Match found - add to matched pairs
        setMatchedPairs([...matchedPairs, cards[firstIndex].emoji]);
        setFlippedIndices([]);
        setDisabled(false);
      } else {
        // No match - flip cards back after delay
        setTimeout(() => {
          setFlippedIndices([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <GameContainer>
      {!gameStarted && !gameOver ? (
        <button onClick={initGame}>Start Game</button>
      ) : (
        <>
          <GameStats>
            <Stat>Time: <strong>{formatTime(timer)}</strong></Stat>
            <Stat>Moves: <strong>{moves}</strong></Stat>
            <Stat>Pairs: <strong>{matchedPairs.length}/{emojis.length}</strong></Stat>
          </GameStats>
          
          <GameBoard>
            {cards.map((card, index) => (
              <Card 
                key={card.id}
                flipped={flippedIndices.includes(index) || matchedPairs.includes(card.emoji)}
                matched={matchedPairs.includes(card.emoji)}
                disabled={disabled}
                onClick={() => handleCardClick(index)}
              >
                <CardFront />
                <CardBack matched={matchedPairs.includes(card.emoji)}>
                  {card.emoji}
                </CardBack>
              </Card>
            ))}
          </GameBoard>
          
          <GameControls>
            <button onClick={initGame}>New Game</button>
          </GameControls>

          {gameOver && (
            <div>
              <h2>Game Over!</h2>
              <p>You completed the game in {formatTime(timer)} with {moves} moves</p>
            </div>
          )}
        </>
      )}
    </GameContainer>
  );
};

export default MemoryGame; 