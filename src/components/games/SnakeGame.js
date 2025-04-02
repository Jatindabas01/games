import React, { useState, useEffect, useRef } from 'react';
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

const Canvas = styled.canvas`
  background-color: var(--white);
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
`;

const GameControls = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const GameOverScreen = styled.div`
  text-align: center;
  background-color: var(--white);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  max-width: 400px;
  width: 100%;
  margin-top: 2rem;
  
  h2 {
    font-size: 1.8rem;
    color: var(--dark-color);
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
`;

const DirectionControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  margin-top: 1.5rem;
  max-width: 200px;
  
  button {
    padding: 0.5rem;
    font-size: 1rem;
    
    &:nth-child(2) {
      grid-column: 2;
      grid-row: 1;
    }
    
    &:nth-child(1) {
      grid-column: 1;
      grid-row: 2;
    }
    
    &:nth-child(3) {
      grid-column: 3;
      grid-row: 2;
    }
    
    &:nth-child(4) {
      grid-column: 2;
      grid-row: 3;
    }
    
    &:nth-child(5) {
      grid-column: 2;
      grid-row: 2;
      visibility: hidden;
    }
  }
`;

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const CANVAS_SIZE = GRID_SIZE * CELL_SIZE;
const GAME_SPEED = 150; // Lower is faster

const SnakeGame = () => {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef(null);
  const lastDirectionRef = useRef('RIGHT');
  
  // Initialize the game
  const initGame = () => {
    // Create initial snake in the middle
    const initialSnake = [
      { x: 8, y: 7 },
      { x: 7, y: 7 },
      { x: 6, y: 7 }
    ];
    
    setSnake(initialSnake);
    generateFood(initialSnake);
    setDirection('RIGHT');
    lastDirectionRef.current = 'RIGHT';
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
    setScore(0);
  };
  
  // Generate food at random position
  const generateFood = (snakeBody) => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    // Make sure food doesn't spawn on the snake
    const isOnSnake = snakeBody.some(
      segment => segment.x === newFood.x && segment.y === newFood.y
    );
    
    if (isOnSnake) {
      generateFood(snakeBody);
    } else {
      setFood(newFood);
    }
  };
  
  // Game loop
  const gameLoop = () => {
    if (isPaused || gameOver || !gameStarted) return;
    
    const newSnake = [...snake];
    const head = { ...newSnake[0] };
    
    // Update direction
    switch (lastDirectionRef.current) {
      case 'UP':
        head.y -= 1;
        break;
      case 'DOWN':
        head.y += 1;
        break;
      case 'LEFT':
        head.x -= 1;
        break;
      case 'RIGHT':
        head.x += 1;
        break;
      default:
        break;
    }
    
    // Check for collisions
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      newSnake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }
    
    // Add new head
    newSnake.unshift(head);
    
    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 10);
      generateFood(newSnake);
    } else {
      // Remove tail if no food eaten
      newSnake.pop();
    }
    
    setSnake(newSnake);
  };
  
  // Setup game loop and event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      e.preventDefault();
      if (!gameStarted || gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (lastDirectionRef.current !== 'DOWN') {
            setDirection('UP');
            lastDirectionRef.current = 'UP';
          }
          break;
        case 'ArrowDown':
          if (lastDirectionRef.current !== 'UP') {
            setDirection('DOWN');
            lastDirectionRef.current = 'DOWN';
          }
          break;
        case 'ArrowLeft':
          if (lastDirectionRef.current !== 'RIGHT') {
            setDirection('LEFT');
            lastDirectionRef.current = 'LEFT';
          }
          break;
        case 'ArrowRight':
          if (lastDirectionRef.current !== 'LEFT') {
            setDirection('RIGHT');
            lastDirectionRef.current = 'RIGHT';
          }
          break;
        case ' ':
          // Space bar to pause/resume
          setIsPaused(!isPaused);
          break;
        default:
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, gameOver, isPaused]);
  
  // Set up game loop
  useEffect(() => {
    if (gameStarted && !gameOver) {
      gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);
    }
    
    return () => clearInterval(gameLoopRef.current);
  }, [snake, food, direction, gameStarted, gameOver, isPaused]);
  
  // Draw game state to canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    
    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#4CAF50' : '#80be87';
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
      
      // Add snake segment border
      ctx.strokeStyle = '#388E3C';
      ctx.strokeRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });
    
    // Draw food
    ctx.fillStyle = '#F44336';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();
    
    // Add food border
    ctx.strokeStyle = '#D32F2F';
    ctx.stroke();
    
    // Draw grid lines
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 0.5;
    
    for (let i = 1; i < GRID_SIZE; i++) {
      // Vertical lines
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      
      // Horizontal lines
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }
  }, [snake, food]);
  
  const handleDirectionButton = (newDirection) => {
    if (!gameStarted || gameOver) return;
    
    switch (newDirection) {
      case 'UP':
        if (lastDirectionRef.current !== 'DOWN') {
          setDirection('UP');
          lastDirectionRef.current = 'UP';
        }
        break;
      case 'DOWN':
        if (lastDirectionRef.current !== 'UP') {
          setDirection('DOWN');
          lastDirectionRef.current = 'DOWN';
        }
        break;
      case 'LEFT':
        if (lastDirectionRef.current !== 'RIGHT') {
          setDirection('LEFT');
          lastDirectionRef.current = 'LEFT';
        }
        break;
      case 'RIGHT':
        if (lastDirectionRef.current !== 'LEFT') {
          setDirection('RIGHT');
          lastDirectionRef.current = 'RIGHT';
        }
        break;
      default:
        break;
    }
  };
  
  return (
    <GameContainer>
      <GameStats>
        <Stat>Score: <strong>{score}</strong></Stat>
        <Stat>High Score: <strong>{highScore}</strong></Stat>
      </GameStats>
      
      <Canvas 
        ref={canvasRef} 
        width={CANVAS_SIZE} 
        height={CANVAS_SIZE}
      />
      
      <GameControls>
        {!gameStarted ? (
          <button onClick={initGame}>Start Game</button>
        ) : (
          <>
            <button onClick={() => setIsPaused(!isPaused)}>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button onClick={initGame}>Restart</button>
          </>
        )}
      </GameControls>
      
      <DirectionControls>
        <button onClick={() => handleDirectionButton('LEFT')}>←</button>
        <button onClick={() => handleDirectionButton('UP')}>↑</button>
        <button onClick={() => handleDirectionButton('RIGHT')}>→</button>
        <button onClick={() => handleDirectionButton('DOWN')}>↓</button>
        <button>•</button>
      </DirectionControls>
      
      {gameOver && (
        <GameOverScreen>
          <h2>Game Over!</h2>
          <p>Your final score: <strong>{score}</strong></p>
          <button onClick={initGame}>Play Again</button>
        </GameOverScreen>
      )}
    </GameContainer>
  );
};

export default SnakeGame; 