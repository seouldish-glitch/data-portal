"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CATEGORY_LABELS: Record<string, string> = {
  sports: 'Sports',
  clubs: 'Clubs & Societies',
  prefects: "Prefects' Guild",
  academics: 'Academic Achievements',
  academic: 'Academic Achievements',
  houses: 'School Houses',
  obu: 'O.B.U',
  associations: 'Associations',
  'sports-wings': 'Sports Wings',
  'alumni-batches': 'Alumni Batches',
  'teachers-guild': "Teachers' Guild",
  'welfare-society': 'Welfare Society',
  choir: 'Choir',
  band: 'Band',
  cadets: 'Cadets',
  scouts: 'Scouts',
  orchestra: 'Orchestra',
};

export default function MySubmissionsPage() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/user/me')
      .then(res => res.json())
      .then(d => { if (d.user) setUser(d.user); });

    fetch('/api/user/submissions')
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setSubmissions(data.submissions || []);
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/user/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid rgba(46,204,113,0.2)', borderTopColor: 'var(--sbc-green)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>Loading your submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', padding: '0' }}>
      {/* Top Nav Bar */}
      <nav style={{
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        gap: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Home
          </Link>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '1rem' }}>/</span>
          <span style={{ color: 'var(--sbc-green)', fontSize: '0.85rem', fontWeight: 600 }}>My Submissions</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user && (
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '28px', height: '28px', background: 'rgba(46,204,113,0.15)', border: '1px solid rgba(46,204,113,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--sbc-green)', fontSize: '0.75rem', fontWeight: 700 }}>
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span style={{ display: 'none' }} className="md-show">{user.name?.split(' ')[0]}</span>
            </span>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.5rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: "'Cinzel', serif", fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', color: 'var(--sbc-green)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
            My Submissions
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.95rem' }}>
            {submissions.length} record{submissions.length !== 1 ? 's' : ''} submitted
          </p>
        </div>

        {/* Empty State */}
        {submissions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#0c0c0c', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
            <div style={{ marginBottom: '1.5rem', opacity: 0.3, display: 'flex', justifyContent: 'center' }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            </div>
            <h3 style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem', fontWeight: 500 }}>No submissions yet</h3>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem', marginBottom: '2rem' }}>Submit your first form to get started.</p>
            <Link href="/" style={{ display: 'inline-block', textDecoration: 'none', padding: '0.75rem 1.75rem', background: 'var(--sbc-green)', color: '#000', fontWeight: 700, borderRadius: '8px', fontSize: '0.9rem' }}>
              Browse Forms
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {submissions.map((sub, i) => (
              <div key={sub.id || i} style={{
                background: '#0d0d0d',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(46,204,113,0.2)'; e.currentTarget.style.background = '#0f0f0f'; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = '#0d0d0d'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: 0 }}>
                  {/* Category badge */}
                  <div style={{ width: '44px', height: '44px', background: 'rgba(46,204,113,0.08)', border: '1px solid rgba(46,204,113,0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'var(--sbc-green)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {CATEGORY_LABELS[sub._category] || sub._category}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' }}>
                      Submitted {new Date(sub.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/edit/${sub._category}/${sub.id}`)}
                  style={{ padding: '0.5rem 1.1rem', background: 'rgba(46,204,113,0.1)', color: 'var(--sbc-green)', border: '1px solid rgba(46,204,113,0.3)', borderRadius: '8px', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', flexShrink: 0 }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--sbc-green)'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = 'var(--sbc-green)'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'rgba(46,204,113,0.1)'; e.currentTarget.style.color = 'var(--sbc-green)'; e.currentTarget.style.borderColor = 'rgba(46,204,113,0.3)'; }}
                >
                  View / Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
