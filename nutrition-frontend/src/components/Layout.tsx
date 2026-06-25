import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app">
      {token && (
        <header className="app-header">
          <div className="logo">Nutrition AI</div>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>

            <Link to="/analyze" onClick={() => setMenuOpen(false)}>
              Analyze Food
            </Link>

            <Link to="/history" onClick={() => setMenuOpen(false)}>
              History
            </Link>

            <Link to="/daily" onClick={() => setMenuOpen(false)}>
              Daily Analytics
            </Link>

            <Link to="/weekly" onClick={() => setMenuOpen(false)}>
              Weekly Analytics
            </Link>

            
          </nav>

          <button className="btn desktop-logout" onClick={logout}>
            Logout
          </button>
        </header>
      )}

      <main className="container">{children}</main>

      {token && (
        <footer className="app-footer">
          © 2026 Nutrition AI
        </footer>
      )}
    </div>
  );
};

export default Layout;