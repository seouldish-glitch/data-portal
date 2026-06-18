"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMsg('Registration successful! Please login.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Redirect to home or submissions
      window.location.href = '/my-submissions';
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000000' }}>
      
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        maxWidth: '1200px',
        minHeight: '80vh',
        gap: '4rem',
        padding: '2rem 5%',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        
        {/* Left Side: Branding */}
        <div style={{ flex: '1 1 400px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center' }}>
             <img src="/navlogo.png" alt="SBC Data Portal" style={{ maxWidth: '100%', height: 'auto', maxHeight: '120px' }} />
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.2rem', lineHeight: '1.8', maxWidth: '450px' }}>
            St. Benedict's College 161st Anniversary Digital Project. Submit your sports, clubs, academic, and society data today to ensure your legacy is permanently archived.
          </p>
        </div>

        {/* Right Side: Form */}
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '450px' }}>
            <h2 style={{ color: 'var(--sbc-white)', marginBottom: '2rem', fontSize: '1.8rem', fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}>Sign In</h2>
            
            {successMsg && (
              <div style={{ padding: '1rem', background: 'rgba(46, 204, 113, 0.1)', border: '1px solid var(--sbc-green)', borderRadius: '8px', color: 'var(--sbc-green)', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                {successMsg}
              </div>
            )}
            {error && (
              <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '8px', color: '#ef4444', marginBottom: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--sbc-white)', marginBottom: '0.5rem' }}>Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required 
                  style={{ width: '100%', background: '#120b1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.2rem 1rem', fontSize: '1rem', color: 'white', outline: 'none' }}
                  onFocus={(e) => e.target.style.border = '1px solid var(--sbc-green)'}
                  onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.05)'}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'var(--sbc-white)', marginBottom: '0.5rem' }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required 
                    style={{ width: '100%', background: '#120b1f', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px', padding: '1.2rem 1rem', fontSize: '1rem', color: 'white', outline: 'none' }}
                    onFocus={(e) => e.target.style.border = '1px solid var(--sbc-green)'}
                    onBlur={(e) => e.target.style.border = '1px solid rgba(255,255,255,0.05)'}
                  />
                  <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--sbc-white)', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--sbc-green)', cursor: 'pointer' }} />
                  Remember me
                </label>
                <Link href="#" style={{ fontSize: '0.9rem', color: '#3b82f6', textDecoration: 'none' }}>Forgot password?</Link>
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                style={{ 
                  marginTop: '1rem', 
                  width: '100%', 
                  padding: '1.2rem',
                  background: 'var(--sbc-green)',
                  color: '#050505',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.3s ease',
                  opacity: isLoading ? 0.7 : 1
                }}
                onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
              >
                {isLoading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
              Don't have an account? <Link href="/register" style={{ color: 'var(--sbc-white)', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
