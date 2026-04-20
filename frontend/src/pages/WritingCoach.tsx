import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, CheckCircle, RefreshCcw } from 'lucide-react';

const WritingCoach: React.FC = () => {
    // Estados para la gestión de la entrada de texto y el flujo de la IA
    const [text, setText] = useState(''); // Texto bruto ingresado por el usuario
    const [isAnalyzing, setIsAnalyzing] = useState(false); // Estado de carga/procesamiento
    const [result, setResult] = useState<any>(null); // Objeto de respuesta con correcciones y feedback

    /**
     * analyzeText: Simula el motor de análisis lingüístico.
     * Evalúa gramática, sintaxis y tono comparándolos con modelos preestablecidos.
     * En producción, este método llamaría a un servicio de LLM (OpenAI/Claude).
     */
    const analyzeText = () => {
        if (!text.trim()) return;
        setIsAnalyzing(true);
        setResult(null);

        // Simulación de latencia de red y procesamiento de lenguaje natural
        setTimeout(() => {
            setIsAnalyzing(false);
            // Mock de respuesta enriquecida con metadatos de aprendizaje
            setResult({
                status: 'success',
                score: 85, // Claridad y precisión del 0 al 100
                corrections: [
                    { original: "i has a dream", correction: "I have a dream", reason: "Subject-verb agreement and capitalization." },
                    { original: "more better", correction: "better", reason: "Double comparative error." }
                ],
                feedback: "Your sentence structure is good, but watch out for basic grammar rules like subject-verb agreement. Try using more diverse vocabulary to express your ideas."
            });
        }, 2000);
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <div style={{ display: 'inline-flex', padding: '0.5rem 1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '30px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.8rem', gap: '0.5rem', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <Sparkles size={16} /> AI POWERED
                </div>
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Writing Coach</h1>
                <p style={{ color: 'var(--text-muted)' }}>Write anything in English and get instant feedback from our advanced AI.</p>
            </header>

            <div className="glass-card" style={{ padding: '2.5rem' }}>
                <textarea 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your English text here..."
                    style={{
                        width: '100%',
                        height: '200px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--border)',
                        borderRadius: '16px',
                        color: 'white',
                        padding: '1.5rem',
                        fontSize: '1.1rem',
                        resize: 'none',
                        outline: 'none',
                        marginBottom: '2rem'
                    }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                        onClick={analyzeText}
                        disabled={isAnalyzing || !text.trim()}
                        className="btn-primary"
                        style={{ padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                    >
                        {isAnalyzing ? (
                            <>
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><RefreshCcw size={18} /></motion.div>
                                ANALYZING...
                            </>
                        ) : (
                            <>
                                <Send size={18} /> ANALYZE TEXT
                            </>
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{ marginTop: '3rem' }}
                    >
                        <div className="glass-card" style={{ padding: '2.5rem', borderLeft: '4px solid var(--primary)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <CheckCircle color="var(--accent)" /> Analysis Result
                                </h3>
                                <div style={{ textAlign: 'right' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{result.score}%</span>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CLARITY SCORE</p>
                                </div>
                            </div>

                            <div style={{ marginBottom: '2.5rem' }}>
                                <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Suggestions</h4>
                                <div style={{ display: 'grid', gap: '1rem' }}>
                                    {result.corrections.map((c: any, i: number) => (
                                        <div key={i} style={{ padding: '1.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                                                <span style={{ color: 'var(--danger)', textDecoration: 'line-through', fontSize: '0.9rem' }}>{c.original}</span>
                                                <Arrow />
                                                <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{c.correction}</span>
                                            </div>
                                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.reason}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>General Feedback</h4>
                                <p style={{ lineHeight: '1.6', color: '#d1d5db' }}>{result.feedback}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const Arrow = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
    </svg>
);

export default WritingCoach;
