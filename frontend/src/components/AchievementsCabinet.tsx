import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Zap, Flame, Target, Star, ShieldCheck } from 'lucide-react';

const ACHIEVEMENTS = [
    { title: '7 Day Streak', desc: 'Unstoppable consistency', icon: <Flame />, color: '#f59e0b', unlocked: true },
    { title: 'Grammar Guru', desc: 'Mastered 50 grammar modules', icon: <Target />, color: '#10b981', unlocked: true },
    { title: 'Video Lover', desc: 'Watched 10 cinematic lessons', icon: <Zap />, color: '#6366f1', unlocked: false },
    { title: 'Early Adopter', desc: 'Joined during Beta', icon: <ShieldCheck />, color: '#ec4899', unlocked: true },
    { title: 'Elite Speaker', desc: '100% pronunciation score', icon: <Star />, color: '#facc15', unlocked: false },
    { title: 'Global Warrior', desc: 'Won 5 Global Battles', icon: <Trophy />, color: '#8b5cf6', unlocked: true },
];

const AchievementsCabinet: React.FC = () => {
    return (
        <div className="glass-card" style={{ padding: '3rem', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Earning Excellence.</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Your cabinet of linguistic mastery and milestone achievements.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>4/6</span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>UNLOCKED</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '2rem' }}>
                {ACHIEVEMENTS.map((ach, i) => (
                    <motion.div
                        key={ach.title}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                            padding: '2rem',
                            borderRadius: '24px',
                            background: ach.unlocked ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.1)',
                            border: `1px solid ${ach.unlocked ? 'rgba(255,255,255,0.1)' : 'transparent'}`,
                            filter: ach.unlocked ? 'none' : 'grayscale(1) opacity(0.4)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {ach.unlocked && (
                            <div style={{ 
                                position: 'absolute', top: -20, left: -20, width: '60px', height: '60px', 
                                background: ach.color, filter: 'blur(30px)', opacity: 0.2 
                            }} />
                        )}
                        
                        <div style={{ 
                            width: '64px', height: '64px', borderRadius: '50%', background: 'var(--surface)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem',
                            color: ach.unlocked ? ach.color : 'var(--text-muted)',
                            boxShadow: ach.unlocked ? `0 0 20px ${ach.color}44` : 'none',
                            border: `2px solid ${ach.unlocked ? ach.color : 'var(--border)'}`
                        }}>
                            {React.cloneElement(ach.icon as any, { size: 32 })}
                        </div>
                        
                        <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem', color: ach.unlocked ? 'var(--text-main)' : 'var(--text-muted)' }}>{ach.title}</h4>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ach.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default AchievementsCabinet;
