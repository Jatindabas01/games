import React from 'react';
import styled from 'styled-components';
import TicTacToeGame from '../components/games/TicTacToeGame';

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
  max-width: 400px;
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

const TicTacToe = () => {
  return (
    <PageContainer>
      <div>
        <PageTitle>Tic Tac Toe</PageTitle>
        <GameDescription>
          The classic game of X and O. Challenge yourself or play with a friend!
        </GameDescription>
      </div>
      
      <TicTacToeGame />
      
      <GameRules>
        <RulesTitle>How to Play</RulesTitle>
        <RulesList>
          <li>Players take turns placing X or O on the board</li>
          <li>X goes first, then O</li>
          <li>Get three of your symbols in a row (horizontally, vertically, or diagonally) to win</li>
          <li>If all cells are filled and no player has three in a row, the game ends in a draw</li>
        </RulesList>
      </GameRules>
    </PageContainer>
  );
};

export default TicTacToe; 