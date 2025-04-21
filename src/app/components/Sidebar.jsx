// src/components/Sidebar.jsx
"use client"
// sidebar , vamos importar para todas as paginas
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Link from "next/link";
import styled from "styled-components";




const StyledLinkText = styled.a`
  color:#4682B4;
  text-decoration: none;
  font-weight: normal;
  &:hover {
    text-decoration: none;
  }
`





export default function Sidebar_component() {
  return (
    <div
    style={{
      width: '250px',
      height: '100vh',
      background: 'green', // Mantém o fundo geral da sidebar
      position: 'relative',

    top: 0,
    left: 0,
    }}
  >
    <Sidebar style={{ height: '100%' }}>
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            // Primeiro nível (MenuItem e SubMenu principais)
            if (level === 0) {
              return {
                color: '#4682B4',
                backgroundColor: active ? '#4682B4' : 'transparent',
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  backgroundColor: '#c5f0c5', // hoover menu
                },
              };
            }
  
            // Segundo nível (itens dentro dos SubMenus)
            if (level === 1) {
              return {
                color: '#C4D6E5',  // fontes submenu
                backgroundColor:  '#AFD5AF	' ,  // background submenu
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  backgroundColor: '#c5f0c5', // hoover submenu
                },
              };
            }
          },
          label: ({ level }) => ({
            fontFamily: 'Arial, sans-serif',
            fontWeight: level === 0 ? 'bold' : 'normal',
          }),
        }}
      >
        <MenuItem>Colégio Vila</MenuItem>
  
        <SubMenu label="Buscador De Login">
          <MenuItem>
          <Link href="/add-student" passHref><StyledLinkText>Adicionar Alunos</StyledLinkText> </Link>
          </MenuItem>
          <MenuItem>
          <Link href="/home" passHref><StyledLinkText>Buscar Aluno</StyledLinkText> </Link>
          </MenuItem>
          
        </SubMenu>
  
        <SubMenu label="Usuários">
          <MenuItem><Link href="/register" passHref><StyledLinkText>Criar Usuário</StyledLinkText> </Link></MenuItem>
          <MenuItem><Link href="/users" passHref><StyledLinkText>Gerenciar Usuários</StyledLinkText> </Link></MenuItem>
        </SubMenu>
  
        <MenuItem>Sair</MenuItem>
      </Menu>
    </Sidebar>
  </div>
  );
}