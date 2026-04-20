import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Play, BookText, BrainCircuit, Sparkles, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Lessons: React.FC = () => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/lessons')
      .then(res => {
        setLessons(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ border: '4px solid var(--border)', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px' }} />
    </div>
  );

  return (
    <div style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
           <span style={{ color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.8rem' }}>EXPLORE CURRICULUM</span>
           <h1 style={{ fontSize: '3.5rem', marginTop: '1rem', fontWeight: '800' }}>Expertly Crafted <span className="gradient-text">Lessons</span></h1>
           <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '1.5rem auto 0' }}>
            High-impact modules designed to take you from core concepts to natural fluency.
           </p>
        </motion.div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
        {lessons.map((lesson, index) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Accent */}
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--primary-glow)', filter: 'blur(50px)', borderRadius: '50%', zIndex: 0 }} />
            
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '14px' }}>
                  {lesson.category === 'GRAMMAR' ? <BrainCircuit color="var(--primary)" size={24} /> : <BookText color="var(--primary)" size={24} />}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                   <Tag label={lesson.level} />
                   <Tag label={lesson.category} color="rgba(16, 185, 129, 0.1)" textColor="var(--accent)" />
                </div>
              </div>
              
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '700' }}>{lesson.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: '1.6' }}>{lesson.description}</p>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Clock size={16} /> 15m</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Sparkles size={16} /> +50 XP</span>
              </div>
            </div>

            <Link 
              to={`/lessons/${lesson.id}`} 
              className="btn-primary" 
              style={{ 
                textDecoration: 'none', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.75rem',
                zIndex: 1
              }}
            >
              <Play size={18} fill="currentColor" /> START MODULE
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Tag = ({ label, color = 'rgba(99, 102, 241, 0.1)', textColor = 'var(--primary)' }: any) => (
  <span style={{ 
    background: color, 
    color: textColor, 
    padding: '0.4rem 0.8rem', 
    borderRadius: '10px', 
    fontSize: '0.7rem', 
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  }}>
    {label}
  </span>
);

export default Lessons;
