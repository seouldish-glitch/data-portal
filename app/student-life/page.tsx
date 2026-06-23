import React from 'react';
import Link from 'next/link';

export default function StudentLife() {
  return (
    <div className="page-wrapper">
      <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '6rem 5%' }}>
        <section className="about-project-section" style={{ margin: '0' }}>
          <h2>Student Life</h2>
          <p>
            Information about student life at St. Benedict's College.
          </p>
          <div style={{ marginTop: '3rem' }}>
            <Link href="/" className="hero-btn-primary">&larr; Back to Home</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
