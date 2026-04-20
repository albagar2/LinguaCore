import React from 'react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { LogOut, User, BookOpen, LayoutDashboard, BookMarked, Sparkles, Moon, Sun, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem 2rem', background: 'var(--card-bg)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }} className="gradient-text">
        LinguaCore
      </Link>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {user ? (
          <>
            <Link to="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link to="/writing-coach" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
              <Sparkles size={20} color="var(--primary)" /> AI Coach
            </Link>
            <Link to="/glossary" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
              <BookMarked size={20} /> Glossary
            </Link>
            <Link to="/lessons" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
              <BookOpen size={20} /> Lessons
            </Link>
            {user.role === 'ADMIN' && (
              <Link to="/documentation" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                <FileText size={20} color="var(--secondary)" /> Docs
              </Link>
            )}
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button 
                    onClick={toggleTheme} 
                    style={{ background: 'rgba(255,255,255,0.05)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '30px', border: '1px solid var(--border)' }}>
                    <User size={18} color="var(--primary)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{user.name}</span>
                    <button onClick={handleLogout} style={{ background: 'none', color: 'var(--danger)', padding: '0', display: 'flex' }}>
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                    onClick={toggleTheme} 
                    style={{ background: 'rgba(255,255,255,0.05)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link to="/login" className="btn-primary" style={{ textDecoration: 'none' }}>Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
