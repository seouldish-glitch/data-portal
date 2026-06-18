"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FORMS_CONFIG } from '../lib/formConfig';

const CATEGORIES = [
  { slug: 'sports', name: 'Sports' },
  { slug: 'clubs', name: 'Clubs & Societies' },
  { slug: 'prefects', name: 'Prefects Guild' },
  { slug: 'academics', name: 'Academic Sections' },
  { slug: 'houses', name: 'House System' },
  { slug: 'associations', name: 'Associations' },
  { slug: 'obu', name: "Old Boys' Union (OBU)" },
  { slug: 'sports-wings', name: 'Sports Wings' },
  { slug: 'alumni-batches', name: 'Alumni Batches' },
  { slug: 'teachers-guild', name: "Teachers' Guild" },
  { slug: 'welfare-society', name: 'Welfare Society' },
  { slug: 'choir', name: 'Choir' },
  { slug: 'band', name: 'Band' },
  { slug: 'cadets', name: 'Cadets' },
  { slug: 'scouts', name: 'Scouts' },
  { slug: 'orchestra', name: 'Orchestra' },
  { slug: 'bens-wesley-committee', name: 'Bens-Wesley Committee' },
];

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeCategory, setActiveCategory] = useState('all');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);

  // Check authentication status on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/check');
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        setIsAuthenticated(false);
      }
    }
    checkAuth();
  }, []);

  // Fetch submissions when authenticated and category changes
  useEffect(() => {
    if (isAuthenticated !== true) return;

    async function fetchSubmissions() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/submissions?category=${activeCategory}`);
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.error || 'Failed to load submissions.');
        }
        setSubmissions(result.data || []);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to load records.');
      } finally {
        setLoading(false);
      }
    }
    fetchSubmissions();
  }, [activeCategory, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid password.');
      }
      setIsAuthenticated(true);
    } catch (err: any) {
      setLoginError(err.message || 'Auth failure.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setSubmissions([]);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const getSubmissionTitle = (sub: any, category: string) => {
    switch (category) {
      case 'sports': return sub.name || 'Unnamed Sport';
      case 'clubs': return sub.name || 'Unnamed Club';
      case 'prefects': return `${sub.headPrefectName ? 'Upper' : 'Primary'} School Board`;
      case 'academics': return `${sub.stream} Section`;
      case 'houses': return `${sub.houseName} House (${sub.level})`;
      case 'associations': return sub.associationName || 'Unnamed Association';
      case 'obu': return sub.branchName || 'Unnamed OBU Branch';
      case 'sports-wings': return sub.wingName || 'Unnamed Sports Wing';
      case 'alumni-batches': return `Batch of ${sub.batchYear}`;
      case 'teachers-guild': return sub.guildName || "Teachers' Guild";
      case 'welfare-society': return sub.societyName || 'Welfare Society';
      case 'choir': return sub.subCategory || 'Choir';
      case 'band': return sub.bandCategory || 'Band';
      case 'cadets': return sub.platoonName || 'Unnamed Platoon';
      case 'scouts': return sub.troopName || 'Unnamed Troop';
      case 'orchestra': return 'Orchestra';
      case 'bens-wesley-committee': return sub.committeeName || 'Unnamed Committee';
      case 'all': 
        if (sub.name) return sub.name;
        if (sub.clubName) return sub.clubName;
        if (sub.headPrefectName) return `${sub.headPrefectName ? 'Upper' : 'Primary'} School Board`;
        if (sub.stream) return `${sub.stream} Section`;
        if (sub.houseName) return `${sub.houseName} House (${sub.level})`;
        if (sub.associationName) return sub.associationName;
        if (sub.branchName) return sub.branchName;
        if (sub.wingName) return sub.wingName;
        if (sub.batchYear) return `Batch of ${sub.batchYear}`;
        if (sub.guildName) return sub.guildName;
        if (sub.societyName) return sub.societyName;
        if (sub.subCategory) return sub.subCategory;
        if (sub.bandCategory) return sub.bandCategory;
        if (sub.platoonName) return sub.platoonName;
        if (sub.troopName) return sub.troopName;
        if (sub.committeeName) return sub.committeeName;
        return 'Submission Detail';
      default: return 'Submission Detail';
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const textToSearch = [
      getSubmissionTitle(sub, activeCategory),
      sub.micName,
      sub.presidentName,
      sub.secretaryName,
      sub.chiefHouseMaster,
    ].join(' ').toLowerCase();
    return textToSearch.includes(searchQuery.toLowerCase());
  });

  const getUploadedImages = (sub: any): string[] => {
    if (!sub) return [];
    const urls: string[] = [];
    const imageKeys = [
      'mediaUploads', 'mediaLinks', 'badgeLogoUrl', 'logoUrl', 
      'houseFlagUrl', 'officialPhotos', 'actionPhotos'
    ];
    imageKeys.forEach(key => {
      const val = sub[key];
      if (typeof val === 'string' && val.startsWith('http')) {
        urls.push(val);
      } else if (Array.isArray(val)) {
        val.forEach(item => {
          if (typeof item === 'string' && item.startsWith('http')) {
            urls.push(item);
          }
        });
      }
    });
    return urls;
  };

  const activeConfig = FORMS_CONFIG[activeCategory];

  // 1. Loading state for initial session check
  if (isAuthenticated === null) {
    return (
      <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <div className="spinner"></div>
      </div>
    );
  }

  // 2. Render Login Form if unauthorized
  if (isAuthenticated === false) {
    return (
      <div className="page-wrapper login-page-bg">
        <div className="login-card-container">
          <div className="login-card">
            <header className="login-header">
              <h2>Dashboard Access</h2>
              <p>Please enter your access password to view submissions.</p>
            </header>
            
            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Password</label>
                <input
                  type="password"
                  placeholder="Enter access password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input-control"
                  required
                />
              </div>
              
              {loginError && <div className="login-error-msg">{loginError}</div>}
              
              <button type="submit" disabled={loginLoading} className="btn-submit" style={{ marginTop: '0.5rem' }}>
                {loginLoading ? 'Authenticating...' : 'Enter Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 3. Render Dashboard once authenticated
  return (
    <div className="page-wrapper">
      <div className="dashboard-container">
        
        {/* Sidebar Panel */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-header">
            <h3>Categories</h3>
            <p>Select a category to view records</p>
          </div>
          <nav className="sidebar-nav">
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedSubmission(null);
              }}
              className={`sidebar-link ${activeCategory === 'all' ? 'active' : ''}`}
            >
              All Submissions
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => {
                  setActiveCategory(cat.slug);
                  setSearchQuery('');
                  setSelectedSubmission(null);
                }}
                className={`sidebar-link ${activeCategory === cat.slug ? 'active' : ''}`}
              >
                {cat.name}
              </button>
            ))}
          </nav>
          <button onClick={handleLogout} className="btn-logout-sidebar">
            Logout Session
          </button>
        </aside>

        {/* Content Panel */}
        <main className="dashboard-main">
          
          <header className="dashboard-content-header">
            <div>
              <span className="dashboard-tag">Database Records</span>
              <h1 className="dashboard-title">{activeCategory === 'all' ? 'All Submissions' : CATEGORIES.find(c => c.slug === activeCategory)?.name}</h1>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
              <button onClick={handleLogout} className="btn-logout-header">
                Logout
              </button>
            </div>
          </header>

          {loading ? (
            <div className="dashboard-state">
              <div className="spinner"></div>
              <p>Loading submission records...</p>
            </div>
          ) : error ? (
            <div className="dashboard-state error">
              <div className="state-icon">✕</div>
              <h3>Error loading submissions</h3>
              <p>{error}</p>
            </div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="dashboard-state empty">
              <div className="state-icon">🗀</div>
              <h3>No submissions found</h3>
              <p>{searchQuery ? 'Try matching another search query' : 'No records have been uploaded for this category yet.'}</p>
              <Link href={`/forms/${activeCategory}`} className="dashboard-btn-action">
                Create First Record
              </Link>
            </div>
          ) : (
            <div className="submissions-grid">
              {filteredSubmissions.map((sub) => {
                const title = getSubmissionTitle(sub, activeCategory);
                const dateString = new Date(sub.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                });
                const images = getUploadedImages(sub);

                return (
                  <div key={sub.id} className="submission-card">
                    <div className="card-header">
                      <span className="card-date">{dateString}</span>
                      {images.length > 0 && (
                        <span className="card-badge">{images.length} {images.length === 1 ? 'Image' : 'Images'}</span>
                      )}
                    </div>
                    <div className="card-body">
                      <h3>{title}</h3>
                      {sub.micName && (
                        <p><strong>MIC:</strong> {sub.micName}</p>
                      )}
                      {(sub.currentChairman || sub.presidentName || sub.headPrefectName) && (
                        <p><strong>Lead:</strong> {sub.currentChairman || sub.presidentName || sub.headPrefectName}</p>
                      )}
                    </div>
                    <div className="card-footer">
                      {images.length > 0 && (
                        <div className="card-image-preview">
                          {images.slice(0, 3).map((img, idx) => (
                            <img key={idx} src={img} alt="preview" />
                          ))}
                        </div>
                      )}
                      <button 
                        onClick={() => setSelectedSubmission(sub)}
                        className="btn-view-details"
                      >
                        View Full Details &rarr;
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Details Modal */}
      {selectedSubmission && activeConfig && (
        <div className="details-modal-overlay" onClick={() => setSelectedSubmission(null)}>
          <div className="details-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedSubmission(null)}>✕</button>
            
            <header className="modal-header">
              <span className="modal-tag">Submission Details</span>
              <h2>{getSubmissionTitle(selectedSubmission, activeCategory)}</h2>
              <span className="modal-date">Submitted on: {new Date(selectedSubmission.createdAt).toLocaleString()}</span>
            </header>

            <div className="modal-body-content">
              <div className="details-fields-list">
                {activeConfig.fields.map((field) => {
                  let value = selectedSubmission[field.name];

                  if (field.type === 'file') return null;

                  if (Array.isArray(value)) {
                    if (value.length === 0) return null;
                    return (
                      <div key={field.name} className="detail-item">
                        <span className="detail-label">{field.label.replace(/^\d+\.\s*/, '')}</span>
                        <ul className="detail-array-list">
                          {value.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  }

                  if (!value) return null;

                  return (
                    <div key={field.name} className="detail-item">
                      <span className="detail-label">{field.label.replace(/^\d+\.\s*/, '')}</span>
                      <p className="detail-value">{value}</p>
                    </div>
                  );
                })}
              </div>

              {getUploadedImages(selectedSubmission).length > 0 && (
                <div className="modal-gallery-section">
                  <h3>Uploaded Media</h3>
                  <div className="modal-image-grid">
                    {getUploadedImages(selectedSubmission).map((url, index) => (
                      <div key={index} className="gallery-image-wrapper">
                        <img src={url} alt={`Upload ${index + 1}`} />
                        <a href={url} target="_blank" rel="noopener noreferrer" className="gallery-view-link">
                          Open Original ↗
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
