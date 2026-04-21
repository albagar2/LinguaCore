import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';
import Spinner from '../components/Spinner';

const Flashcards: React.FC = () => {
    const [cards, setCards] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/vocabulary')
            .then(res => {
                setCards(res.data.data.slice(0, 10)); // Top 10 for daily review
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            if (currentIndex < cards.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                toast.success("Review session complete! +50 XP");
            }
        }, 300);
    };

    if (loading) return <Spinner />;
    if (cards.length === 0) return <div style={{ textAlign: 'center', marginTop: '10rem' }}><h2>No cards to review yet.</h2></div>;

    const currentCard = cards[currentIndex];

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '10rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Smart Flashcards.</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Spaced Repetition System: Card {currentIndex + 1} / {cards.length}</p>
            </div>

            <div style={{ perspective: '1000px', width: '100%', height: '450px', marginBottom: '4rem' }}>
                <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                    style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', cursor: 'pointer' }}
                    onClick={() => setIsFlipped(!isFlipped)}
                >
                    {/* Front */}
                    <div style={{ 
                        position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                        background: 'var(--surface)', borderRadius: '32px', border: '2px solid var(--border)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: '2rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}>
                        <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.4rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>{currentCard.category}</span>
                        <h2 style={{ fontSize: '4rem', fontWeight: '900', letterSpacing: '-0.05em' }}>{currentCard.word}</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Click to flip</p>
                    </div>

                    {/* Back */}
                    <div style={{ 
                        position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
                        background: 'var(--surface-alt)', borderRadius: '32px', border: '2px solid var(--primary)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        gap: '1.5rem', transform: 'rotateY(180deg)', boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.2)'
                    }}>
                        <h3 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>{currentCard.translation}</h3>
                        <p style={{ maxWidth: '70%', textAlign: 'center', fontSize: '1.1rem', color: 'var(--text-main)' }}>{currentCard.meaning}</p>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border)', width: '80%' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>Example: "{currentCard.example}"</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                <button onClick={handleNext} className="btn-secondary" style={{ padding: '1.25rem 3rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderColor: '#ef4444', color: '#ef4444' }}>
                    <X size={20} /> HARD
                </button>
                <button onClick={handleNext} className="btn-primary" style={{ padding: '1.25rem 3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Check size={20} /> EASY
                </button>
            </div>
        </div>
    );
};

export default Flashcards;
