import React from "react";
import Sidebar_component from "../components/Sidebar";
import {List }   from "../components/List";


export default function home() {
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
        <List/>
      </div>
    </div>
  );
}