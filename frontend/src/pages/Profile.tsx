import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Shield, Save, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

const Profile: React.FC = () => {
    // Obtención de datos del usuario actual desde Zustand
    const { user } = useAuthStore();
    
    // Estados locales para el formulario de edición
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isSaving, setIsSaving] = useState(false);

    /**
     * handleSave: Simula el envío de datos al backend.
     * Implementa feedback visual mediante 'sonner' para mejorar la UX.
     */
    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("Profile updated successfully!", {
                description: "Your changes are now live across LinguaCore."
            });
        }, 1500);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '10rem' }}>
            <header style={{ marginBottom: '3rem' }}>
                <Link to="/dashboard" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    <ArrowLeft size={18} /> BACK TO DASHBOARD
                </Link>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-1.5px' }}>
                    Account <span className="gradient-text">Settings.</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Manage your identity and digital learning profile.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
                {/* Sidebar / Avatar */}
                <aside>
                    <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary)' }}>
                            <img src={`https://ui-avatars.com/api/?name=${name}&background=6366f1&color=fff&size=120`} alt="Avatar" />
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, cursor: 'pointer', transition: '0.3s' }} className="avatar-hover">
                                <Camera size={24} color="white" />
                            </div>
                        </div>
                        <h4 style={{ marginBottom: '0.25rem' }}>{name}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 'bold' }}>{user?.role} Profile</p>
                        
                        <div style={{ marginTop: '2rem', display: 'grid', gap: '0.5rem' }}>
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '12px', fontSize: '0.8rem' }}>
                                <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{user?.xp}</span> Total XP Earned
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Form */}
                <main className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                <User size={16} /> FULL NAME
                            </label>
                            <input 
                                type="text" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', color: 'white', outline: 'none' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                                <Mail size={16} /> EMAIL ADDRESS
                            </label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1rem', color: 'white', opacity: 0.6, cursor: 'not-allowed' }}
                                disabled
                            />
                            <p style={{ fontSize: '0.7rem', color: 'var(--accent)', marginTop: '0.5rem' }}>Contact admin to change restricted login emails.</p>
                        </div>

                        <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '16px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                <Shield size={18} color="var(--primary)" />
                                <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Account Security</span>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Advanced encryption is active for your learning data. Next automatic audit in 14 days.</p>
                        </div>

                        <motion.button 
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSave}
                            disabled={isSaving}
                            style={{ 
                                background: 'var(--primary)', border: 'none', borderRadius: '12px', 
                                padding: '1rem', color: 'white', fontWeight: 'bold', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                                boxShadow: '0 10px 30px var(--primary-glow)',
                                opacity: isSaving ? 0.7 : 1
                            }}
                        >
                            {isSaving ? "SAVING..." : (
                                <>
                                    <Save size={18} /> SAVE CHANGES
                                </>
                            )}
                        </motion.button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Profile;
