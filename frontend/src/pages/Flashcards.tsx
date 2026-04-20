import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, Volume2, Sparkles, HelpCircle, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useTTS } from '../hooks/useTTS';

const Flashcards: React.FC = () => {
  const [words, setWords] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mastered, setMastered] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const { speak } = useTTS();

  useEffect(() => {
    api.get('/vocabulary')
      .then(res => {
        setWords(res.data.data.sort(() => Math.random() - 0.5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleNext = async (isCorrect: boolean) => {
    const wordId = words[currentIndex].id;
    
    // Call SRS API
    try {
        await api.post('/vocabulary/mastery', { vocabId: wordId, isCorrect });
    } catch (error) {
        console.error("SRS Sync failed", error);
    }

    if (isCorrect) setMastered(prev => prev + 1);
    setIsFlipped(false);
    setShowHint(false);
    
    setTimeout(() => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            setCurrentIndex(words.length); // Trigger finish
        }
    }, 150);
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15rem' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ border: '4px solid var(--border)', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px' }} />
    </div>
  );
  
  if (words.length === 0) return (
    <div style={{ textAlign: 'center', marginTop: '10rem' }}>
        <h3>No words available for study.</h3>
        <Link to="/lessons" className="btn-primary" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-block' }}>Complete some lessons first!</Link>
    </div>
  );

  const isFinished = currentIndex >= words.length;
  const currentWord = words[currentIndex];

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '10rem' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/glossary" style={{ color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 'bold' }}>
          <ArrowLeft size={18} /> GLOSSARY
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>Mastery Progress</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '150px', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <motion.div 
                            animate={{ width: `${(currentIndex / words.length) * 100}%` }}
                            style={{ height: '100%', background: 'var(--primary)' }}
                        />
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--text-main)' }}>{Math.min(currentIndex + 1, words.length)}/{words.length}</span>
                </div>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', padding: '0.6rem 1.2rem', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.2)', fontWeight: 'bold' }}>
                {mastered} MASTERED
            </div>
        </div>
      </header>

      <div style={{ position: 'relative', height: '480px', perspective: '2000px' }}>
        {/* Visual Stack Decoration */}
        {!isFinished && currentIndex < words.length - 1 && (
            <div style={{ position: 'absolute', top: '15px', right: '-10px', left: '10px', bottom: '-15px', background: 'rgba(255,255,255,0.02)', borderRadius: '40px', border: '1px solid var(--border)', zIndex: -1 }} />
        )}
        {!isFinished && currentIndex < words.length - 2 && (
            <div style={{ position: 'absolute', top: '25px', right: '-20px', left: '20px', bottom: '-25px', background: 'rgba(255,255,255,0.01)', borderRadius: '40px', border: '1px solid var(--border)', zIndex: -2 }} />
        )}

        <AnimatePresence mode="wait">
            {!isFinished ? (
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100, rotateY: 20 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -100, rotateY: -20 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                    style={{ height: '100%', width: '100%' }}
                >
                    <motion.div
                        onClick={() => setIsFlipped(!isFlipped)}
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
                        style={{
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            position: 'relative',
                            cursor: 'pointer'
                        }}
                    >
                        {/* FRONT */}
                        <div className="glass-card" style={{
                            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            textAlign: 'center', padding: '3rem', border: '1px solid var(--border)'
                        }}>
                            <div style={{ position: 'absolute', top: '2rem', left: '2rem', display: 'flex', gap: '0.5rem' }}>
                                <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', fontSize: '0.7rem', padding: '0.3rem 0.8rem', borderRadius: '8px', fontWeight: '800' }}>{currentWord.category}</span>
                            </div>
                            
                            <motion.div 
                                style={{ position: 'relative' }}
                                whileHover="hover"
                            >
                                <h1 style={{ fontSize: '5rem', marginBottom: '1.5rem', fontWeight: '900', letterSpacing: '-2px' }}>
                                    {currentWord.word}
                                </h1>
                                {/* Translation on Hover */}
                                <motion.div 
                                    variants={{
                                        hover: { opacity: 1, y: -10, scale: 1 },
                                        initial: { opacity: 0, y: 0, scale: 0.8 }
                                    }}
                                    initial="initial"
                                    style={{ 
                                        position: 'absolute', top: '-3rem', left: '50%', transform: 'translateX(-50%)',
                                        background: 'var(--accent)', color: 'white', padding: '0.5rem 1rem', borderRadius: '12px',
                                        fontSize: '0.9rem', fontWeight: 'bold', whiteSpace: 'nowrap', pointerEvents: 'none',
                                        boxShadow: '0 10px 20px rgba(16, 185, 129, 0.3)'
                                    }}
                                >
                                    {currentWord.translation || "Traducción no disponible"}
                                    <div style={{ position: 'absolute', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderTop: '5px solid var(--accent)' }} />
                                </motion.div>
                            </motion.div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <HelpCircle size={16} /> Click to reveal meaning
                            </div>
                            
                            {/* Hint Trigger */}
                            <button 
                                onClick={(e) => { e.stopPropagation(); setShowHint(!showHint); }}
                                style={{ position: 'absolute', bottom: '2rem', right: '2rem', background: 'var(--glass)', border: '1px solid var(--border)', color: 'var(--text-muted)', padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                            >
                                <Info size={14} /> {showHint ? "Hide Hint" : "Need a hint?"}
                            </button>
                            
                            {showHint && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ position: 'absolute', bottom: '5rem', left: '2rem', right: '2rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', padding: '1rem', borderRadius: '16px', color: 'var(--warning)', fontSize: '0.9rem' }}>
                                    <strong>Hint:</strong> {currentWord.meaning.substring(0, 30)}...
                                </motion.div>
                            )}
                        </div>

                        {/* BACK */}
                        <div className="glass-card" style={{
                            position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            textAlign: 'center', padding: '4rem', border: '2px solid var(--primary)'
                        }}>
                             <button 
                                onClick={(e) => { e.stopPropagation(); speak(currentWord.word); }}
                                className="float-animation"
                                style={{ background: 'var(--primary)', border: 'none', borderRadius: '50%', width: '60px', height: '60px', color: 'white', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px var(--primary-glow)' }}
                             >
                                <Volume2 size={30} />
                             </button>
                             <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', fontWeight: '800' }}>{currentWord.meaning}</h2>
                             
                             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '2rem' }}>
                                {currentWord.synonyms?.split(',').map((s: string) => (
                                    <span key={s} style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', padding: '0.3rem 0.8rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>{s.trim()}</span>
                                ))}
                             </div>

                             <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '400px' }}>
                                "{currentWord.example}"
                             </p>
                        </div>
                    </motion.div>
                </motion.div>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '4rem' }}>
                    <div style={{ width: '100px', height: '100px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                        <Sparkles size={50} color="var(--accent)" />
                    </div>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '900' }}>Sprint Mastered!</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem' }}>You successfully reviewed {mastered} words and gained <strong>+{mastered * 10} XP</strong>.</p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <button onClick={() => window.location.reload()} className="btn-primary" style={{ padding: '1.25rem 3rem' }}>RESTART SESSION</button>
                        <Link to="/dashboard" style={{ textDecoration: 'none', color: 'var(--text-main)', padding: '1.25rem 3rem', borderRadius: '16px', border: '1px solid var(--border)', fontWeight: '700' }}>DONE</Link>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {!isFinished && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginTop: '5rem' }}>
            <motion.button 
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNext(false)}
                style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid var(--danger)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
                <X size={40} />
            </motion.button>
            <motion.button 
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNext(true)}
                style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--accent)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
                <Check size={40} />
            </motion.button>
        </div>
      )}
    </div>
  );
};

export default Flashcards;
