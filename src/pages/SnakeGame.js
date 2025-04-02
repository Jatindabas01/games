import React from 'react';
import styled from 'styled-components';
import SnakeGameComponent from '../components/games/SnakeGame';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: var(--dark-color);
  margin-bottom: 0.5rem;
  text-align: center;
`;

const GameDescription = styled.p`
  text-align: center;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const GameRules = styled.div`
  background-color: var(--white);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin-top: 2rem;
`;

const RulesTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--dark-color);
  margin-bottom: 1rem;
  text-align: center;
`;

const RulesList = styled.ul`
  list-style-position: inside;
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const KeyControls = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1rem;
`;

const KeyControl = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--light-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  
  span {
    font-weight: 600;
    color: var(--dark-color);
  }
`;

const SnakeGamePage = () => {
  return (
    <PageContainer>
      <div>
        <PageTitle>Snake Game</PageTitle>
        <GameDescription>
          Control the snake, eat the food, and avoid hitting the walls or yourself!
        </GameDescription>
      </div>
      
      <SnakeGameComponent />
      
      <GameRules>
        <RulesTitle>How to Play</RulesTitle>
        <RulesList>
          <li>Use arrow keys or on-screen buttons to control the snake</li>
          <li>Eat the red food to grow longer and earn points</li>
          <li>Avoid hitting the walls or running into yourself</li>
          <li>Try to get the highest score possible!</li>
        </RulesList>
        
        <RulesTitle style={{ marginTop: '1.5rem' }}>Controls</RulesTitle>
        <KeyControls>
          <KeyControl>
            <span>↑</span> Move Up
          </KeyControl>
          <KeyControl>
            <span>↓</span> Move Down
          </KeyControl>
          <KeyControl>
            <span>←</span> Move Left
          </KeyControl>
          <KeyControl>
            <span>→</span> Move Right
          </KeyControl>
          <KeyControl>
            <span>Space</span> Pause/Resume
          </KeyControl>
        </KeyControls>
      </GameRules>
    </PageContainer>
  );
};

export default SnakeGamePage;
