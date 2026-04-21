import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const WritingCoach: React.FC = () => {
    const [text, setText] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleAnalyze = () => {
        if (text.length < 20) {
            toast.error("Please write a bit more for a comprehensive analysis.");
            return;
        }
        setAnalyzing(true);
        // Simulate AI analysis
        setTimeout(() => {
            setResult({
                score: 82,
                errors: [
                    { word: 'is', type: 'grammar', suggestion: 'has been', explanation: 'Present perfect is better for ongoing actions.', index: 12 },
                    { word: 'happy', type: 'style', suggestion: 'delighted', explanation: 'Use more sophisticated adjectives in professional contexts.', index: 25 },
                ],
                strengths: ['Great vocabulary variety', 'Clear structure'],
                tone: 'Friendly / Professional'
            });
            setAnalyzing(false);
        }, 2000);
    };

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '10rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="gradient-text" style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>AI Writing Coach.</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Get instant linguistic heatmaps and stylistic suggestions.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: result ? '1.5fr 1fr' : '1fr', gap: '3rem' }}>
                <div className="glass-card" style={{ padding: '2.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>YOUR ESSAY</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{text.length} characters</span>
                    </div>
                    <textarea 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Paste your English text here..."
                        style={{ 
                            width: '100%', height: '400px', background: 'var(--surface-alt)', 
                            border: '1px solid var(--border)', borderRadius: '16px', padding: '1.5rem',
                            color: 'var(--text-main)', fontSize: '1.1rem', resize: 'none', outline: 'none',
                            lineHeight: '1.6'
                        }}
                    />
                    <button 
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className="btn-primary" 
                        style={{ width: '100%', marginTop: '2rem', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
                    >
                        {analyzing ? 'AI ENGINES CALIBRATING...' : <><Wand2 size={20} /> ANALYZE WRITING</>}
                    </button>
                </div>

                <AnimatePresence>
                    {result && !analyzing && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)' }}>{result.score}%</div>
                                <p style={{ color: 'var(--text-muted)' }}>LINGUISTIC QUALITY SCORE</p>
                            </div>

                            <div className="glass-card" style={{ padding: '2.5rem' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><AlertCircle size={20} color="#fb7185" /> SUGGESTIONS</h3>
                                <div style={{ display: 'grid', gap: '1.5rem' }}>
                                    {result.errors.map((err: any, i: number) => (
                                        <div key={i} style={{ padding: '1rem', background: 'rgba(251, 113, 133, 0.05)', borderRadius: '12px', borderLeft: '4px solid #fb7185' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                <span style={{ textDecoration: 'line-through', opacity: 0.5 }}>{err.word}</span>
                                                <ChevronRight size={16} />
                                                <span style={{ fontWeight: 'bold', color: '#fb7185' }}>{err.suggestion}</span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{err.explanation}</p>
                                        </div>
                                    ))}
                                </div>

                                <h3 style={{ marginTop: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><CheckCircle2 size={20} color="#34d399" /> STRENGTHS</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {result.strengths.map((s: string, i: number) => (
                                        <li key={i} style={{ marginBottom: '0.75rem', fontSize: '0.9rem', display: 'flex', gap: '0.5rem' }}>
                                            <span style={{ color: '#34d399' }}>✓</span> {s}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default WritingCoach;
