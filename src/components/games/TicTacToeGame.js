import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  width: 300px;
  height: 300px;
`;

const Cell = styled.div`
  background-color: var(--white);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
  cursor: ${props => (props.value || props.gameOver ? 'not-allowed' : 'pointer')};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  color: ${props => (props.value === 'X' ? '#FF5722' : '#2196F3')};
  
  &:hover {
    transform: ${props => (props.value || props.gameOver ? 'none' : 'scale(1.05)')};
    box-shadow: ${props => (props.value || props.gameOver ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0 6px 12px rgba(0, 0, 0, 0.15)')};
  }
`;

const Status = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--dark-color);
  text-align: center;
`;

const GameControls = styled.div`
  display: flex;
  gap: 1rem;
`;

const TicTacToeGame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const handleClick = (index) => {
    // If cell is already filled or game is over, do nothing
    if (board[index] || winner) {
      return;
    }

    // Create a new copy of the board
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setGameOver(false);
  };

  useEffect(() => {
    // Check for winner
    const winningPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winningPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        setGameOver(true);
        return;
      }
    }

    // Check for draw
    if (!board.includes(null)) {
      setGameOver(true);
    }
  }, [board]);

  const renderStatus = () => {
    if (winner) {
      return `Winner: Player ${winner}`;
    } else if (gameOver) {
      return 'Game ended in a draw!';
    } else {
      return `Next player: ${isXNext ? 'X' : 'O'}`;
    }
  };

  return (
    <GameContainer>
      <Status>{renderStatus()}</Status>
      
      <Board>
        {board.map((value, index) => (
          <Cell 
            key={index} 
            value={value} 
            gameOver={gameOver}
            onClick={() => handleClick(index)}
          >
            {value}
          </Cell>
        ))}
      </Board>
      
      <GameControls>
        <button onClick={resetGame}>Reset Game</button>
      </GameControls>
    </GameContainer>
  );
};

export default TicTacToeGame; 