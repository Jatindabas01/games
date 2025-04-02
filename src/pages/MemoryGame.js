import React from 'react';
import styled from 'styled-components';
import MemoryGameComponent from '../components/games/MemoryGame';

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

const MemoryGamePage = () => {
  return (
    <PageContainer>
      <div>
        <PageTitle>Memory Game</PageTitle>
        <GameDescription>
          Test your memory by matching pairs of cards. How fast can you match them all?
        </GameDescription>
      </div>
      
      <MemoryGameComponent />
      
      <GameRules>
        <RulesTitle>How to Play</RulesTitle>
        <RulesList>
          <li>Click on a card to flip it and see what's on the other side</li>
          <li>You can flip a second card to try to match the first one</li>
          <li>If the two cards match, they stay flipped</li>
          <li>If they don't match, they flip back over</li>
          <li>Try to find all pairs with the fewest moves and in the fastest time</li>
        </RulesList>
      </GameRules>
    </PageContainer>
  );
};

export default MemoryGamePage; 