import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Search, Layers, Volume2 } from 'lucide-react';
import { useTTS } from '../hooks/useTTS';

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
    v.meaning.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading glossary...</div>;

  return (
    <div>
      <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
        <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Vocabulary Glossary</h1>
        <p style={{ color: 'var(--text-muted)' }}>Search and review terminology from all lessons.</p>
      </header>

      <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 5rem' }}>
        <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input 
          type="text"
          placeholder="Search for a word or meaning..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '1rem 1rem 1rem 3.5rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            color: 'white',
            fontSize: '1.1rem',
            outline: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {filteredVocab.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'flex-start' }}>
                <div>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', display: 'block' }}>{item.word}</span>
                    <span style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '6px', fontWeight: 'bold' }}>{item.category}</span>
                </div>
                <button 
                    onClick={() => speak(`${item.word}. ${item.example || ''}`)}
                    style={{ background: 'rgba(99, 102, 241, 0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', cursor: 'pointer' }}
                >
                    <Volume2 size={20} />
                </button>
            </div>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem' }}>{item.meaning}</p>
            {item.example && (
              <div style={{ borderLeft: '3px solid var(--primary)', paddingLeft: '1rem', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '0 12px 12px 0' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>"{item.example}"</p>
              </div>
            )}
            <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                <Layers size={14} /> {item.level}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredVocab.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '5rem' }}>
          No words found matching your search.
        </div>
      )}
    </div>
  );
};

export default Glossary;
