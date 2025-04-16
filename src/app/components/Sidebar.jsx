// src/components/Sidebar.jsx
"use client"
import React from "react";
import Link from "next/link";
import Head from 'next/head';
import '../../app/'


export default function Sidebar() {
  return ( 
    
    <>
    <Head>
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" 
      />
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" 
      />
    </Head>

    <aside id='header'>
      <section className="profile">
     
        <h1>Anderson Lima</h1>
        <div className="social-links mt-4 text-center">
          <a target="_blank" href="https://www.linkedin.com/in/anderson-lima-617b50241/" rel="noopener noreferrer">
            <i className="bi bi-linkedin"></i>
          </a>
          <a target="_blank" href="https://github.com/Andersonlima13/" rel="noopener noreferrer">
            <i className="bi bi-github"></i>
          </a>
          <a target="_blank" href="https://www.instagram.com/anderson.tsx/" rel="noopener noreferrer">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </section>

      <nav id='navbar' className="nav-menu">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link href="#inicio" className="nav-link active" aria-current="page">
              <i className="bi bi-house" aria-hidden="true"></i> Inicio
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#sobre" className="nav-link">
              <i className="bi bi-person" aria-hidden="true"></i> Sobre
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#habilidades" className="nav-link">
              <i className="bi bi-list-check" aria-hidden="true"></i> Habilidades
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#curriculo" className="nav-link">
              <i className="bi bi-file-earmark" aria-hidden="true"></i> Currículo
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#portfolio" className="nav-link">
              <i className="bi bi-collection" aria-hidden="true"></i> Portfólio
            </Link>
          </li>
          <li className="nav-item">
            <Link href="#contato" className="nav-link">
              <i className="bi bi-envelope" aria-hidden="true"></i> Contato
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  </>
    );
}
