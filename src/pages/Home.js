import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const HomeContainer = styled.div`
  text-align: center;
  background: linear-gradient(135deg, 
    ${props => props.theme.colors.background.main} 0%,
    ${props => props.theme.colors.background.card} 100%);
  min-height: 100vh;
  padding: 4rem 2rem;
`;

const Hero = styled.div`
  margin-bottom: 5rem;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h1`
  font-size: 4rem;
  background: linear-gradient(135deg, #fff 0%, #aab2d0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
  letter-spacing: 2px;
  font-family: 'Orbitron', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: ${props => props.theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.8;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const GameCard = styled.div`
  background: linear-gradient(145deg, 
    ${props => props.theme.colors.background.card} 0%,
    ${props => props.theme.colors.background.light} 100%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${props => props.theme.colors.background.main} 0px 8px 24px;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: ${props => props.theme.colors.background.main} 0px 16px 40px;
  }
`;

const GameImage = styled.div`
  height: 200px;
  background: linear-gradient(135deg,
    ${props => props.theme.colors.accent} 0%,
    ${props => props.theme.colors.button.primary} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.colors.text.primary};
  font-size: 3rem;
  font-weight: bold;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.2));
  }
`;

const GameInfo = styled.div`
  padding: 1.5rem;
`;

const GameTitle = styled.h3`
  font-size: 1.5rem;
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const GameDescription = styled.p`
  margin-bottom: 1.5rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const PlayButton = styled(Link)`
  display: inline-block;
  background: linear-gradient(135deg,
    ${props => props.theme.colors.button.primary} 0%,
    ${props => props.theme.colors.accent} 100%);
  color: ${props => props.theme.colors.text.primary};
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.3);
    background: linear-gradient(135deg,
      ${props => props.theme.colors.accent} 0%,
      ${props => props.theme.colors.button.primary} 100%);
  }
`;

const Home = () => {
  const games = [
    {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      description: 'The classic game of X and O. Challenge yourself or play with a friend!',
      icon: '️⭕❌'
    },
    {
      id: 'memory',
      title: 'Memory Game',
      description: 'Test your memory by matching pairs of cards. How fast can you match them all?',
      icon: '🃏🧠'
    },
    {
      id: 'snake',
      title: 'Snake Game',
      description: 'Control the snake, eat the food, and avoid hitting the walls or yourself!',
      icon: '🐍🍎'
    }
  ];

  return (
    <HomeContainer>
      <Hero>
        <Title>Welcome to Game Fox</Title>
        <Subtitle>
          Relive the Classics! 🎮 Old Games, Timeless Fun!
        </Subtitle>
      </Hero>
      
      <GamesGrid>
        {games.map(game => (
          <GameCard key={game.id}>
            <GameImage>{game.icon}</GameImage>
            <GameInfo>
              <GameTitle>{game.title}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              <PlayButton to={`/${game.id}`}>Play Now</PlayButton>
            </GameInfo>
          </GameCard>
        ))}
      </GamesGrid>
    </HomeContainer>
  );
};

export default Home; 