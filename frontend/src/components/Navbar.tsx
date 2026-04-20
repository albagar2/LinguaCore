import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { LogOut, User, BookOpen, LayoutDashboard, BookMarked, Sparkles, Moon, Sun, FileText, Bell, ChevronDown, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const { isDarkMode, toggleTheme } = useThemeStore();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Challenge accepted by Alex_Master!", time: "2m ago", icon: <Sparkles size={14}/>, read: false },
    { id: 2, text: "You reached ADVANCED level!", time: "1h ago", icon: <Star size={14} color="#f59e0b" fill="#f59e0b"/>, read: false },
  ]);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("Inbox Cleared", {
        description: "All notifications have been marked as read."
    });
    setShowNotifications(false);
  };

  const handleMarkRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

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
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ position: 'relative' }}>
                    <button 
                        onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
                        style={{ background: 'rgba(255,255,255,0.05)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)', position: 'relative' }}
                    >
                        <Bell size={18} />
                        {unreadCount > 0 && (
                            <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', background: 'var(--danger)', borderRadius: '50%', border: '2px solid var(--card-bg)' }} />
                        )}
                    </button>
                    
                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="glass-card"
                                style={{ 
                                    position: 'absolute', top: '120%', right: 0, width: '320px', 
                                    padding: '1.25rem', zIndex: 1000, 
                                    background: '#090e1a',
                                    border: '1px solid rgba(99, 102, 241, 0.6)',
                                    boxShadow: '0 30px 70px rgba(0,0,0,0.9)' 
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                    <h5 style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '900', letterSpacing: '1px' }}>CORE ALERTS</h5>
                                    {unreadCount > 0 && <span style={{ fontSize: '0.6rem', background: 'var(--danger)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>{unreadCount} UNREAD</span>}
                                </div>
                                <div style={{ display: 'grid', gap: '0.85rem' }}>
                                    {notifications.map(n => (
                                        <motion.div 
                                            key={n.id} 
                                            onClick={() => handleMarkRead(n.id)}
                                            whileHover={{ x: 5, background: n.read ? 'rgba(255,255,255,0.02)' : 'rgba(99, 102, 241, 0.12)' }}
                                            style={{ 
                                                display: 'flex', gap: '1rem', padding: '1rem', borderRadius: '14px', 
                                                background: n.read ? 'rgba(255,255,255,0.01)' : 'rgba(99, 102, 241, 0.05)', 
                                                border: n.read ? '1px solid rgba(255,255,255,0.02)' : '1px solid rgba(99,102,241,0.2)',
                                                cursor: 'pointer', transition: '0.3s',
                                                opacity: n.read ? 0.5 : 1
                                            }}
                                        >
                                            <div style={{ padding: '0.5rem', background: n.read ? 'rgba(255,255,255,0.05)' : 'rgba(99, 102, 241, 0.15)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                {n.icon}
                                            </div>
                                            <div style={{ flex: 1 }}>
                                                <p style={{ fontSize: '0.85rem', margin: 0, fontWeight: n.read ? '400' : '700', color: n.read ? '#94a3b8' : '#f8fafc', lineHeight: '1.4' }}>{n.text}</p>
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>{n.time}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                                <button 
                                    onClick={handleMarkAllRead}
                                    style={{ width: '100%', marginTop: '1.25rem', padding: '0.75rem', background: 'var(--primary)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', boxShadow: unreadCount > 0 ? '0 5px 15px var(--primary-glow)' : 'none', opacity: unreadCount > 0 ? 1 : 0.5 }}
                                >
                                    {unreadCount > 0 ? "MARK ALL AS READ" : "SYSTEM LOG CLEAN"}
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button 
                    onClick={toggleTheme} 
                    style={{ background: 'rgba(255,255,255,0.05)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-main)' }}
                >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                
                <div style={{ position: 'relative' }}>
                    <div 
                        onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1.25rem', borderRadius: '30px', border: '1px solid var(--border)', transition: '0.3s' }}
                    >
                        <User size={18} color="var(--primary)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{user.name}</span>
                        <ChevronDown size={14} color="var(--text-muted)" />
                    </div>

                    <AnimatePresence>
                        {showProfileMenu && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="glass-card"
                                style={{ position: 'absolute', top: '120%', right: 0, width: '200px', padding: '0.5rem', zIndex: 1000, border: '1px solid var(--border)', boxShadow: '0 15px 30px rgba(0,0,0,0.3)' }}
                            >
                                <Link to="/profile" onClick={() => setShowProfileMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', textDecoration: 'none', color: 'var(--text-main)', fontSize: '0.85rem' }}>
                                    <User size={16} color="var(--primary)" /> My Settings
                                </Link>
                                <div style={{ height: '1px', background: 'var(--border)', margin: '0.5rem' }} />
                                <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', background: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', color: 'var(--danger)', fontSize: '0.85rem' }}>
                                    <LogOut size={16} /> Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
