import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--primary-color);
  color: var(--white);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--white);
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  font-weight: bold;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: var(--white);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--white);
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <NavContainer>
        <Logo to="/">Game Fox</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/tictactoe">Tic Tac Toe</NavLink>
          <NavLink to="/memory">Memory Game</NavLink>
          <NavLink to="/snake">Snake Game</NavLink>
        </NavLinks>
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header; 