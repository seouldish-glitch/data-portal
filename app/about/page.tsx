import React from 'react';
import Link from 'next/link';

export default function About() {
  return (
    <div className="page-wrapper">
      <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', padding: '6rem 5%' }}>
        <section className="about-project-section" style={{ margin: '0' }}>
          <h2>About This Project</h2>
          <p>
            This data collection initiative is a project by the St. Benedict's College Media Web Developing Department, proudly powered by St. Benedict's College Media.
          </p>
          <p>
            We are securely collecting this information exclusively for the St. Benedict's College official website development project in celebration of the upcoming 161st Anniversary.
          </p>
          <div style={{ marginTop: '3rem' }}>
            <Link href="/" className="hero-btn-primary">&larr; Back to Home</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
