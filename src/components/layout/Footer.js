import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--dark-color);
  color: var(--white);
  padding: 1.5rem;
  text-align: center;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Copyright = styled.p`
  margin-bottom: 0.5rem;
`;

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>© {year} GameZone. All rights reserved.</Copyright>
        <p>Enjoy our collection of fun browser games!</p>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 