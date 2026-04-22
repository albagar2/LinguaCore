import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Play, BookText, BrainCircuit, Sparkles, 
    Clock, Search, Filter, Headphones, Mic, Film 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SmartText from '../components/SmartText';
import Spinner from '../components/Spinner';
import PageHeader from '../components/PageHeader';

const Lessons: React.FC = () => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/lessons')
      .then(res => {
        setLessons(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ['ALL', 'GRAMMAR', 'VOCABULARY', 'BUSINESS', 'LISTENING', 'SPEAKING'];
  const levels = ['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'];

  const filteredLessons = lessons.filter(l => 
    (filter === 'ALL' || l.category === filter) &&
    (levelFilter === 'ALL' || l.level === levelFilter) &&
    (l.title.toLowerCase().includes(search.toLowerCase()) || l.description.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <Spinner />;

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <PageHeader 
          title="Precision Learning."
          badge="CURRICULUM ENGINE"
          compact={true}
        >
          <Link to="/immersion" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.5rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', borderRadius: '12px', color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem' }}>
              <Film size={16} fill="var(--primary)" /> EXPLORE CINEMATIC LIBRARY
          </Link>
        </PageHeader>
      </div>

      {/* Controls Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', background: 'var(--surface-alt)', padding: '1.25rem', borderRadius: '18px', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setFilter(cat)}
                      style={{
                        padding: '0.4rem 0.8rem',
                        borderRadius: '10px',
                        fontSize: '0.75rem',
                        background: filter === cat ? 'var(--primary)' : 'var(--surface)',
                        color: filter === cat ? 'white' : 'var(--text-muted)',
                        border: filter === cat ? '1px solid var(--primary)' : '1px solid var(--border)',
                        fontWeight: '700',
                        cursor: 'pointer'
                      }}
                    >
                        {cat}
                    </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: '900', color: 'var(--text-muted)', opacity: 0.7 }}>LEVEL:</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {levels.map(lvl => (
                        <button 
                          key={lvl}
                          onClick={() => setLevelFilter(lvl)}
                          style={{
                            padding: '0.3rem 0.75rem',
                            borderRadius: '30px',
                            fontSize: '0.7rem',
                            background: levelFilter === lvl ? 'var(--primary-glow)' : 'transparent',
                            color: levelFilter === lvl ? 'var(--primary)' : 'var(--text-muted)',
                            border: `1px solid ${levelFilter === lvl ? 'var(--primary)' : 'var(--border)'}`,
                            fontWeight: '800',
                            cursor: 'pointer'
                          }}
                        >
                            {lvl}
                        </button>
                    ))}
                  </div>
              </div>
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="Find a module..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ 
                    width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem', background: 'var(--input-bg)', 
                    border: '1px solid var(--border)', borderRadius: '12px', color: 'var(--input-color)', outline: 'none', fontSize: '0.85rem'
                }}
              />
          </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        <AnimatePresence mode="popLayout">
            {filteredLessons.map((lesson, index) => (
            <motion.div
                layout
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="glass-card"
                style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                padding: '1.75rem'
                }}
            >
                {/* Visual Flair */}
                <div style={{ position: 'absolute', top: -40, right: -40, width: '120px', height: '120px', background: 'var(--primary-glow)', filter: 'blur(60px)', opacity: 0.3 }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div style={{ width: '48px', height: '48px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CategoryIcon category={lesson.category} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Tag label={lesson.level} />
                    </div>
                </div>
                
                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.75rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}><SmartText>{lesson.title}</SmartText></h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: '1.5', height: '3.0rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    <SmartText>{lesson.description}</SmartText>
                </p>
                
                <div style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem', fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14} /> 12 MIN</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Sparkles size={14} color="var(--warning)" /> +40 XP</span>
                </div>
                </div>

                <Link 
                to={`/lessons/${lesson.id}`} 
                className="btn-primary" 
                style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', zIndex: 1, padding: '1rem' }}
                >
                <Play size={18} fill="currentColor" /> ACCESS MODULE
                </Link>
            </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {filteredLessons.length === 0 && (
          <div style={{ textAlign: 'center', marginTop: '10rem', opacity: 0.5 }}>
              <Filter size={60} style={{ marginBottom: '1.5rem' }} />
              <h3>No modules found in this category.</h3>
          </div>
      )}
    </div>
  );
};

const CategoryIcon = ({ category }: { category: string }) => {
    switch(category) {
        case 'GRAMMAR': return <BrainCircuit color="var(--primary)" size={28} />;
        case 'LISTENING': return <Headphones color="var(--primary)" size={28} />;
        case 'SPEAKING': return <Mic color="var(--primary)" size={28} />;
        case 'BUSINESS': return <Sparkles color="var(--primary)" size={28} />;
        default: return <BookText color="var(--primary)" size={28} />;
    }
}

const Tag = ({ label }: { label: string }) => (
  <span style={{ 
    background: 'var(--tag-bg)', 
    color: 'var(--tag-color)', 
    padding: '0.4rem 0.8rem', 
    borderRadius: '8px', 
    fontSize: '0.7rem', 
    fontWeight: '800',
    border: '1px solid var(--border)'
  }}>
    {label}
  </span>
);

export default Lessons;
