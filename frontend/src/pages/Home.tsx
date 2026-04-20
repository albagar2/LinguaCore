import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, Mic } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const Home: React.FC = () => {
  const { token } = useAuthStore();

  return (
    <div style={{ position: 'relative', minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {/* Background Shapes */}
      <div className="bg-shape" style={{ width: '400px', height: '400px', background: 'var(--primary)', top: '-100px', left: '-100px', opacity: 0.2 }} />
      <div className="bg-shape" style={{ width: '600px', height: '600px', background: 'var(--secondary)', bottom: '-200px', right: '-200px', opacity: 0.15 }} />
      
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, ease: "circOut" }}
        >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.6rem 1.25rem', borderRadius: '40px', fontSize: '0.85rem', fontWeight: '800', marginBottom: '2.5rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
                <Sparkles size={16} /> THE FUTURE OF LANGUAGE LEARNING
            </div>
            
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: '900' }}>
              Master English with <br />
              <span className="gradient-text">Absolute Precision.</span>
            </h1>
            
            <p style={{ color: 'var(--text-muted)', fontSize: 'clamp(1rem, 2vw, 1.4rem)', maxWidth: '800px', margin: '0 auto 3.5rem', fontWeight: '500' }}>
              Experience an AI-powered ecosystem designed to sharpen your speaking, writing, and comprehension through high-stakes interactive practice.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                <Link to={token ? "/dashboard" : "/register"} className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem 3rem', fontSize: '1.1rem' }}>
                    {token ? "ENTER DASHBOARD" : "START YOUR JOURNEY"} <ArrowRight size={20} />
                </Link>
                <Link to="/lessons" style={{ textDecoration: 'none', color: 'var(--text-main)', border: '1px solid var(--border)', padding: '1.25rem 2.5rem', borderRadius: '16px', fontWeight: '700', backdropFilter: 'blur(10px)', background: 'var(--glass)' }}>
                    EXPLORE COURSES
                </Link>
            </div>
        </motion.div>

        {/* Feature Highlights */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '8rem' }}>
            <FeatureCard 
                icon={<Mic size={32} color="var(--primary)" />} 
                title="AI Speech Recognition" 
                desc="Real-time pronunciation feedback powered by neural engine." 
            />
            <FeatureCard 
                icon={<Zap size={32} color="#f59e0b" />} 
                title="Dynamic Flashcards" 
                desc="Scientific spaced repetition for vocabulary retention." 
            />
            <FeatureCard 
                icon={<Target size={32} color="#10b981" />} 
                title="Gamified Goals" 
                desc="Climb the leaderboard and unlock exclusive certifications." 
            />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }: any) => (
    <motion.div 
        whileHover={{ y: -10 }}
        className="glass-card" 
        style={{ padding: '3rem 2rem', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
        <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border)' }}>
            {icon}
        </div>
        <div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{desc}</p>
        </div>
    </motion.div>
);

export default Home;
