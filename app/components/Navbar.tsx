"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="site-navbar">
      <div className="nav-container">
        <Link href="/" className="nav-brand" onClick={closeMenu}>
          <span className="nav-brand-text old-english-text">St. Benedict's College</span>
        </Link>
        
        <button 
          className={`nav-burger ${isOpen ? 'open' : ''}`} 
          onClick={toggleMenu} 
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        <div className={`nav-links ${isOpen ? 'nav-active' : ''}`}>
          <Link href="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link href="/dashboard" className="nav-link" onClick={closeMenu}>Dashboard</Link>
          <Link href="/about" className="nav-link" onClick={closeMenu}>About</Link>
          <Link href="/dashboard" className="nav-btn-cta" onClick={closeMenu}>Access Portal</Link>
        </div>
      </div>
    </nav>
  );
}
