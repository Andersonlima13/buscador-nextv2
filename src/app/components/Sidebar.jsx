// src/components/Sidebar.jsx
"use client"
// sidebar , vamos importar para todas as paginas
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Link from "next/link";
import styled from "styled-components";
import { FiSearch,FiPlus,FiSettings } from 'react-icons/fi'




const StyledLinkText = styled.a`
  color:#374151;
  text-decoration: none;
  font-weight: normal;
  &:hover {
    text-decoration: none;
  }

`





export default function Sidebar_component() {
  return (
    <div style={{
      width: '250px',
      height: '100vh',
      background: '#fffff',
      position: 'fixed', // Alterado para fixed
      top: 0, // Fixa no topo
      left: 0, // Fixa na esquerda
      margin: 0,
      padding: 0,
      overflow: 'hidden', // Remove barras de rolagem indesejadas
    }}>
      <Sidebar 
        rootStyles={{
          height: '100%',
          margin: 0,
          padding: 0,
          border: 'none', // Remove bordas padrão
        }}
      >
        <Menu
          style={{
            margin: 0,
            padding: '10px 0', // Ajuste interno apenas vertical
          }}
          menuItemStyles={{
            button: ({ level, active }) => {
              if (level === 0) {
                return {
                  color: '#374151',
                  backgroundColor: active ? 'transparent' : 'transparent',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  fontFamily: 'Arial, sans-serif',
                  margin: 0, // Adicionado
                  padding: '10px 20px', // Controle explícito
                  '&:hover': {
                    backgroundColor: '#fffff' ,
                  },
                };
              }

              if (level === 1) {
                return {
                  color: '#374151',
                  backgroundColor: active ? 'transparent' : 'transparent',

                  fontSize: '14px',
                  fontFamily: 'Arial, sans-serif',
                  margin: 0, // Adicionado
                  padding: '8px 20px 8px 30px', // Padding com indentação
                  '&:hover': {
                    backgroundColor: '#fffff',
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
  <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingRight: '10px'
    }}>
      <Link href="/home" passHref>
        <StyledLinkText>Gerenciar Alunos</StyledLinkText>
      </Link>
      <FiSettings  style={{ marginLeft: 'auto' }} />
    </div>
  </MenuItem>
  

</SubMenu>
  
        <SubMenu label="Usuários">
        
 
  
  <MenuItem>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingRight: '10px'
    }}>
      <Link href="/users" passHref>
        <StyledLinkText>Gerenciar Usuários</StyledLinkText>
      </Link>
      <FiSettings  style={{ marginLeft: 'auto' }} />
    </div>
  </MenuItem>



        </SubMenu>
  
      
      </Menu>
    </Sidebar>
  </div>
  );
}