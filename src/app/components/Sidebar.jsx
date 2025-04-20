// src/components/Sidebar.jsx
"use client"
// sidebar , vamos importar para todas as paginas
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import Link from "next/link";

export default function Sidebar_component() {
  return (
    <div style={{ 
      width: '250px',
      height: '100vh'
    }}>
      <Sidebar style={{ height: '100%' }}>
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: disabled ? '#fffff' : '#fffff',
                  backgroundColor: active ? '#fffff' : '#fffff',
                };
            },
          }}
        ><MenuItem> Colégio Vila </MenuItem>
          <SubMenu label="Buscador De Login">
            <MenuItem><Link className='style-none'href="/add-student">Adcionar Alunos</Link> </MenuItem>
            <MenuItem><Link className='style-none'href="/home">Buscar Aluno</Link></MenuItem>
            <MenuItem><Link className='style-none'href="/students">Listar Alunos</Link> </MenuItem>
          </SubMenu>
          <SubMenu label="Usuários">
            <MenuItem> Criar Usuário </MenuItem>
            <MenuItem> Alunos </MenuItem>
          </SubMenu>
          <MenuItem> Sair </MenuItem>
          
        </Menu>
      </Sidebar>
    </div>
  );
}