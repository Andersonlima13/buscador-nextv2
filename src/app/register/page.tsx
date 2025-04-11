import React from "react";
import Sidebar_component from "../components/Sidebar";

export default function register() {
  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh'
    }}>
      <Sidebar_component />
      <div style={{ 
        flex: 1,
        padding: '20px'
      }}>
        Conteudo pagina de registro
      </div>
    </div>
  );
}