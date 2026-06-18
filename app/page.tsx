"use client";

import React from 'react';
import Link from 'next/link';

export default function Home() {
  const forms = [
    {
      id: 1,
      title: "Sports Data",
      description: "Information regarding sports teams, MICs, coaches, captains, and achievements.",
      slug: "sports",
    },
    {
      id: 2,
      title: "Clubs & Societies Data",
      description: "Information regarding clubs, MICs, presidents, and specific events.",
      slug: "clubs",
    },
    {
      id: 3,
      title: "Board of Prefects",
      description: "Information on the Master-in-Charge, Head Prefect, and other board details.",
      slug: "prefects",
    },
    {
      id: 4,
      title: "Houses",
      description: "Information regarding House Masters, House Captains, and achievements (Primary and Upper School).",
      slug: "houses",
    },
    {
      id: 5,
      title: "Academic Section",
      description: "Information regarding Sectional Heads, staff, and subjects taught.",
      slug: "academics",
    },
    {
      id: 6,
      title: "Associations / Welfare Societies",
      description: "Information regarding association presidents, MICs, and contact details.",
      slug: "associations",
    },
    {
      id: 7,
      title: "Old Boys' Union (OBU)",
      description: "Information regarding branches, presidents, and key contributions.",
      slug: "obu",
    },
    {
      id: 8,
      title: "Sports Wings",
      description: "Information regarding sports wings, presidents, and key contributions.",
      slug: "sports-wings",
    },
    {
      id: 9,
      title: "Alumni Batches / Groups",
      description: "Information regarding batch coordinators, active members, and key contributions.",
      slug: "alumni-batches",
    },
    {
      id: 10,
      title: "Teachers' Guild",
      description: "Information regarding the guild president, staff welfare, and major events.",
      slug: "teachers-guild",
    },
    {
      id: 11,
      title: "Welfare Society",
      description: "Information regarding the welfare society, events, and staff support.",
      slug: "welfare-society",
    },
    {
      id: 12,
      title: "Choir",
      description: "Information regarding the choir, sub-categories, events, and performances.",
      slug: "choir",
    },
    {
      id: 13,
      title: "Band",
      description: "Information regarding the bands (Western, Eastern, Primary), members, and events.",
      slug: "band",
    },
    {
      id: 14,
      title: "Cadets",
      description: "Information regarding the cadet platoon, OIC, leaders, and camp participations.",
      slug: "cadets",
    },
    {
      id: 15,
      title: "Scouts",
      description: "Information regarding the scout troop, leaders, and jamboree/camp details.",
      slug: "scouts",
    }
  ];

  return (
    <div className="page-wrapper">
      <main className="main-content">
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-badge">
                <span className="pulse-dot"></span>
                161st Anniversary Digital Project
              </div>
              <h1 className="old-english-text hero-title">St. Benedict's College</h1>
              <h2 className="modern-subheadline">Master Data Portal</h2>
              <p className="hero-description">
                Submit your sports, clubs, academic, and society data today to ensure your legacy is permanently archived on our new official website.
              </p>
              <div className="hero-buttons">
                <a href="#forms-list" className="hero-btn-primary">
                  <span>Submit Records</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        <div id="forms-list" className="data-collection-list">
          {forms.map((form, index) => (
            <Link href={`/forms/${form.slug}`} key={form.id} className="list-item" style={{ textDecoration: 'none', animationDelay: `${0.2 + index * 0.1}s` }}>
              <div className="item-top-row">
                <span className="item-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="item-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
              </div>
              <div className="item-bottom-row">
                <h3 className="item-title">{form.title}</h3>
                <p className="item-desc">{form.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
