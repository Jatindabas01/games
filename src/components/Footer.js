import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #090f1f;
  color: white;
  padding: 2rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 2rem;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 200px;
  text-align: center;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  font-family: 'Orbitron', sans-serif;
  background: linear-gradient(135deg, #fff 0%, #aab2d0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FooterLink = styled(Link)`
  display: block;
  color: #aab;
  text-decoration: none;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #aab;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Game Fox</FooterTitle>
          <p>Enjoy our collection of free browser games.</p>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Games</FooterTitle>
          <FooterLink to="/tictactoe">Tic Tac Toe</FooterLink>
          <FooterLink to="/memory">Memory Game</FooterLink>
          <FooterLink to="/snake">Snake Game</FooterLink>
        </FooterSection>
      </FooterContent>
      
      <FooterBottom>
        <p>&copy; {new Date().getFullYear()} Game Fox. All rights reserved.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer; 