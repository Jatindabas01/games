import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #090f1f;
  padding: 1rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  font-family: 'Orbitron', sans-serif;
  background: linear-gradient(135deg, #fff 0%, #aab2d0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  &:hover {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const Nav = () => {
  return (
    <NavContainer>
      <Logo to="/">Game Fox</Logo>
    </NavContainer>
  );
};

export default Nav; 