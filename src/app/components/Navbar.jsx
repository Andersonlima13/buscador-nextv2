// components/Navbar.jsx
"use client"
import React from "react";
import styled from "styled-components";
import Link from "next/link";

const StyledLinkText = styled.a`
  color: #ffff;
  text-decoration: none;
  font-weight: normal;
  &:hover {
    text-decoration: none;
    color: #3a6d99;
  }
`;

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #374151;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const NavSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LeftSection = styled(NavSection)`
  justify-content: flex-start;
  width: 250px; /* Mesma largura do sidebar */
`;

const RightSection = styled(NavSection)`
  margin-left: auto; /* Mágica do alinhamento à direita */
  padding-right: 50px; /* Espaço do canto direito */
`;

const NavTitle = styled.div`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

export default function Navbar() {
  return (
    <NavContainer>
      <LeftSection>
        <NavTitle>Colégio Vila</NavTitle>
      </LeftSection>
      
      <RightSection>
        <Link href="/profile" passHref>
          <StyledLinkText>Perfil</StyledLinkText>
        </Link>
        <Link href="/logout" passHref>
          <StyledLinkText>Sair</StyledLinkText>
        </Link>
      </RightSection>
    </NavContainer>
  );
}