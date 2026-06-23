import React from 'react';
import Link from 'next/link';

export default function SportsSocieties() {
  return (
    <div className="page-wrapper">
      <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '6rem 5%' }}>
        <section className="about-project-section" style={{ margin: '0' }}>
          <h2>Sports & Societies</h2>
          <p>
            Information about sports and societies at St. Benedict's College.
          </p>
          <div style={{ marginTop: '3rem' }}>
            <Link href="/" className="hero-btn-primary">&larr; Back to Home</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
