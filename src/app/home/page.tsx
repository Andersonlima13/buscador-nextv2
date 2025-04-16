import React from "react";
import {List }   from "../components/List";
import SidebarComponent from "../components/Sidebar";


export default function home() {
  return (
    <div style={{ 
      display: 'flex',
      minHeight: '100vh'
    }}>
      <SidebarComponent />
      <div style={{ 
        flex: 1,
        padding: '20px'
      }}>
        <List/>
      </div>
    </div>
  );
}