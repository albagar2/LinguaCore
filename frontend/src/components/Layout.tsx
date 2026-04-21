import React from 'react';
import Navbar from './Navbar';
import AIChatTutor from './AIChatTutor';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <main style={{ flex: 1, padding: '3rem 4rem' }} className="container">
        {children}
      </main>
      <AIChatTutor />
      <footer style={{ padding: '2.5rem 4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', borderTop: '1px solid var(--border)' }}>
        © 2024 LinguaCore - Advanced English Learning Platform
      </footer>
    </div>
  );
};

export default Layout;
