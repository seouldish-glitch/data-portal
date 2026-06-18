"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    fetch('/api/user/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    await fetch('/api/user/logout', { method: 'POST' });
    setUser(null);
    setShowUserMenu(false);
    router.push('/login');
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
          <Link href="/my-submissions" className="nav-link" onClick={closeMenu}>My Submissions</Link>
          <Link href="/about" className="nav-link" onClick={closeMenu}>About</Link>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="nav-btn-cta"
                style={{ background: 'transparent', border: '1px solid var(--sbc-green)', color: 'var(--sbc-green)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                Hi {user.name.split(' ')[0]}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ opacity: 0.7, transition: 'transform 0.2s', transform: showUserMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}><path d="m6 9 6 6 6-6"/></svg>
              </button>
              {showUserMenu && (
                <div style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, background: '#0d0d0d', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden', minWidth: '160px', zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
                  <Link href="/my-submissions" onClick={() => { closeMenu(); setShowUserMenu(false); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.875rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                        onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    My Submissions
                  </Link>
                  <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', color: '#ef4444', background: 'transparent', border: 'none', width: '100%', textAlign: 'left', fontSize: '0.875rem', cursor: 'pointer' }}
                          onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
                          onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="nav-btn-cta" onClick={closeMenu}>Login / Register</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
