import React from "react";
import Sidebar from "../components/Sidebar";

export default function home() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="content-wrapper p-4">
        <h1>Bem-vindo à Home</h1>
      </div>
    </div>
  );
}