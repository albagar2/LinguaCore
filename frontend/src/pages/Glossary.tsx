import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Search, Layers, Volume2, Sparkles, Zap } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';
import { Link } from 'react-router-dom';

const Glossary: React.FC = () => {
  const [vocab, setVocab] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { speak } = useTTS();

  useEffect(() => {
    api.get('/vocabulary')
      .then(res => {
        setVocab(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredVocab = vocab.filter(v => 
    v.word.toLowerCase().includes(search.toLowerCase()) || 
    v.meaning.toLowerCase().includes(search.toLowerCase()) ||
    (v.synonyms && v.synonyms.toLowerCase().includes(search.toLowerCase()))
  );

  if (loading) return <div style={{ textAlign: 'center', marginTop: '10rem' }}>
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ border: '4px solid var(--border)', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px', margin: '0 auto' }} />
  </div>;

  return (
    <div style={{ paddingBottom: '5rem' }}>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Vocabulary Glossary</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Deepen your knowledge with meanings, synonyms, and examples.</p>
        
        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <Link to="/flashcards" className="btn-primary" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2.5rem' }}>
                <Sparkles size={20} /> START STUDY SPRINT
            </Link>
        </div>
      </header>

      <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 5rem' }}>
        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text"
          placeholder="Search for words, meanings, or synonyms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '1.25rem 1.25rem 1.25rem 3.5rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            color: 'white',
            fontSize: '1.1rem',
            outline: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {filteredVocab.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card"
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                <div>
                    <span style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', display: 'block', letterSpacing: '-0.5px' }}>{item.word}</span>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 'bold' }}>{item.category}</span>
                        <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 'bold' }}>{item.level}</span>
                    </div>
                </div>
                <button 
                    onClick={() => speak(item.word)}
                    style={{ background: 'rgba(99, 102, 241, 0.1)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', cursor: 'pointer' }}
                >
                    <Volume2 size={24} />
                </button>
            </div>

            <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: '1.6' }}>{item.meaning}</p>
            
            {item.synonyms && (
                <div style={{ marginBottom: '1.5rem' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Synonyms</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {item.synonyms.split(',').map((syn: string) => (
                            <span key={syn} style={{ color: 'var(--accent)', fontSize: '0.9rem', background: 'rgba(16, 185, 129, 0.05)', padding: '0.25rem 0.75rem', borderRadius: '8px' }}>
                                {syn.trim()}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {item.example && (
              <div style={{ marginTop: 'auto', borderLeft: '3px solid var(--primary)', paddingLeft: '1.25rem', background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '0 16px 16px 0' }}>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.5' }}>"{item.example}"</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredVocab.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '5rem', padding: '4rem', background: 'var(--glass)', borderRadius: '24px' }}>
          <Zap size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
          <h3>No words found matching your search.</h3>
          <p>Try searching for a different term or synonym.</p>
        </div>
      )}
    </div>
  );
};

export default Glossary;
