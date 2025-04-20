// src/components/Sidebar.jsx
"use client"
// sidebar , vamos importar para todas as paginas
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Link from "next/link";
import styled from "styled-components";




const SidebarLinkText = styled.span`
  text-decoration: none;
  color: inherit;
`





export default function Sidebar_component() {
  return (
    <div
    style={{
      width: '250px',
      height: '100vh',
      background: '#33424A', // Mantém o fundo geral da sidebar
    }}
  >
    <Sidebar style={{ height: '100%' }}>
      <Menu
        menuItemStyles={{
          button: ({ level, active }) => {
            // Primeiro nível (MenuItem e SubMenu principais)
            if (level === 0) {
              return {
                color: '#00646d',
                backgroundColor: active ? '#00646d' : 'transparent',
                fontWeight: 'bold',
                fontSize: '16px',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  backgroundColor: '#007a87', // hoover menu
                },
              };
            }
  
            // Segundo nível (itens dentro dos SubMenus)
            if (level === 1) {
              return {
                color: '#02383D',  // fontes submenu
                backgroundColor:  '#118892' ,  // background submenu
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
                '&:hover': {
                  backgroundColor: '#00646d', // hoover submenu
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
          <SidebarLinkText href="/add-student">Adicionar Alunos</SidebarLinkText>
          </MenuItem>
          <MenuItem>
          <SidebarLinkText href="/home">Buscar Alunos</SidebarLinkText>
          </MenuItem>
          
        </SubMenu>
  
        <SubMenu label="Usuários">
          <MenuItem>Criar Usuário</MenuItem>
          <MenuItem>Alunos</MenuItem>
        </SubMenu>
  
        <MenuItem>Sair</MenuItem>
      </Menu>
    </Sidebar>
  </div>
  );
}