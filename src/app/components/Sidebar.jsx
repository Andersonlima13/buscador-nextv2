// src/components/Sidebar.jsx
"use client"
import React from "react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside
      className="main-sidebar sidebar-dark-primary elevation-4 d-flex flex-column"
      style={{ backgroundColor: "rgb(18, 57, 120)" }}
    >
      {/* Brand Logo */}
      <a className="brand-link">
        <img
          src="/img/fav_colegiovila.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: 0.8 }}
        />
        <span className="brand-text font-weight-light p-2">Colégio Vila</span>
      </a>

      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="info">
            <a href="#" className="d-block"></a>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Dashboards */}
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                  Dashboards
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link href="/dashboards" className="nav-link">
                    <i className="nav-icon fas fa-wreath"></i>
                    <p>Plataformas</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/dashboards/olimpiadas" className="nav-link">
                    <i className="nav-icon fas fa-wreath"></i>
                    <p>Olimpíadas</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/adm" className="nav-link">
                    <i className="nav-icon fas fa-wreath"></i>
                    <p>Pedagógico</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/notfound" className="nav-link">
                    <i className="nav-icon fas"></i>
                    <p>Financeiro</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Buscador de Logins */}
            <li className="nav-item">
              <a href="#" className="nav-link active">
                <i className="nav-icon fas fa-search"></i>
                <p>
                  Buscador De Logins
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                <Link href="/home" className="nav-link">
                <p>Buscar aluno</p>
                    </Link>
                </li>
                <li className="nav-item">
                <Link href="/home" className="nav-link">
  <p>Buscar aluno</p>
</Link>
                </li>
              </ul>
            </li>

            {/* Usuários */}
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-user"></i>
                <p>
                  Usuários
                  <i className="right fas fa-angle-left"></i>
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                <Link href="/home" className="nav-link">
  <p>Buscar aluno</p>
</Link>
                </li>
                <li className="nav-item">
                  <Link href="/listarusuarios" className="nav-link">
                    <i className="nav-icon fas fa-list"></i>
                    <p>Lista de usuários</p>
                  </Link>
                </li>
              </ul>
            </li>

            {/* Sair */}
            <li className="nav-item">
              <Link href="/login" className="nav-link">
                <i className="nav-icon fa fa-arrow-left"></i>
                <p>Sair</p>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
