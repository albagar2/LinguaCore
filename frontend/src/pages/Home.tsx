import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Shield, Zap } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
          Master English with <br />
          <span className="gradient-text">LinguaCore</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 3rem' }}>
          The AI-powered platform that takes you from total beginner to native fluency through immersive exercises and real-time feedback.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
          <Link to="/lessons" className="btn-primary" style={{ textDecoration: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Get Started Free
          </Link>
          <button style={{ background: 'transparent', border: '1px solid var(--border)', color: 'white', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            View Curriculum
          </button>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '8rem' }}>
        <FeatureCard 
          icon={<Rocket color="var(--primary)" />} 
          title="Rapid Progress" 
          description="Adaptive learning paths that evolve with your speed and performance." 
        />
        <FeatureCard 
          icon={<Zap color="#fbbf24" />} 
          title="Interactive Exercises" 
          description="Speaking, writing, and listening drills designed for maximum retention." 
        />
        <FeatureCard 
          icon={<Shield color="var(--accent)" />} 
          title="Native Fluency" 
          description="Focus on real-world expressions and natural sounding structures." 
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: any) => (
  <div className="glass-card" style={{ textAlign: 'left', padding: '2.5rem' }}>
    <div style={{ marginBottom: '1.5rem' }}>{icon}</div>
    <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{description}</p>
  </div>
);

export default Home;
