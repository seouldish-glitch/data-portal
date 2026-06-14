import './globals.css';

export const metadata = {
  title: "SBC 161 Data Portal",
  description: "St. Benedict's College 161st Anniversary Digital Portal",
};

import Link from 'next/link';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        
        <nav className="site-navbar">
          <div className="nav-container">
            <Link href="/" className="nav-brand">
              <span className="nav-brand-text">St. Benedict's College</span>
            </Link>
            <div className="nav-links">
              <Link href="/" className="nav-link">Home</Link>
              <Link href="/dashboard" className="nav-link">Dashboard</Link>
              <Link href="/about" className="nav-link">About</Link>
              <Link href="/dashboard" className="nav-btn-cta">Access Portal</Link>
            </div>
          </div>
        </nav>

        {children}

        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-section footer-col-1" style={{ flex: 1.5 }}>
              <h4 className="old-english-text" style={{ textTransform: 'none', fontSize: '1.8rem', letterSpacing: '1px', color: 'var(--sbc-white)' }}>St. Benedict's College</h4>
              <p className="footer-about-text">
                This data collection initiative is a project by the St. Benedict's College Media Web Developing Department. We are securely collecting this information exclusively for the St. Benedict's College official website development project in celebration of the upcoming 161st Anniversary.
              </p>
              <p className="footer-address">Colombo 13, Sri Lanka.</p>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-section footer-col-2" style={{ flex: 1.2 }}>
              <h4 className="footer-header-accent">Contact</h4>
              <div className="contact-group">
                <strong>Rev. Bro. Dilshan Vimukthi FSC</strong>
                <span className="contact-title">Sub Director / Sports Coordinator</span>
                <span className="contact-number">+94 71 037 3472</span>
              </div>
              <div className="contact-group" style={{ marginTop: '1.5rem' }}>
                <strong>Yemith Senitha</strong>
                <span className="contact-title">President - SBC Media</span>
                <span className="contact-number">+94 71 336 2135</span>
              </div>
            </div>

            <div className="footer-divider"></div>

            <div className="footer-section footer-col-3" style={{ flex: 1 }}>
              <h4 className="footer-header-accent">Powered By</h4>
              <div className="footer-right">
                <img src="/media-logo.png" alt="SBC Media" className="media-logo" />
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div>&copy; {new Date().getFullYear()} St. Benedict's College Media. All Rights Reserved. / St. Benedict's College Media Web Developing Department</div>
          </div>
        </footer>
      </body>
    </html>
  );
}
