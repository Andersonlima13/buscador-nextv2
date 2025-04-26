'use client'

import React from 'react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  width: 250px;
  margin: 20px;
  padding: 20px;
  border-radius: 20px;
  background: #f0f0f0;
  box-shadow: 10px 10px 20px #cbced1, -10px -10px 20px #ffffff;
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProfilePic = styled.img`
  width: 60%;
  max-width: 150px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const Info = styled.div`
  padding: 10px 0;

  p {
    margin: 5px 0;
    display: flex;
    align-items: center;

    strong {
      margin-right: 5px;
    }
  }
`;

const SocialLinks = styled.div`
  margin-top: 10px;

  a {
    display: inline-block;
    margin-right: 10px;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

// Componente principal
const ProfileCard = () => {
  return (
    <Container>
      <Card>
        <ProfilePic src="https://via.placeholder.com/150" alt="Profile" />
        <Info>
          <p><strong>Nome:</strong> Anderson Lima</p>
          <p><strong>Departamento:</strong> TI</p>
          <p><strong>Cargo:</strong> Desenvolvedor</p>
          <p><strong>Telefone:</strong> (11) 99999-9999</p>
          <p><strong>Celular:</strong> (11) 98888-8888</p>
        </Info>
        <SocialLinks>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </SocialLinks>
      </Card>
    </Container>
  );
};

export default ProfileCard;
