import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Award, BookOpen, ChevronRight, Volume2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTTS } from '../hooks/useTTS';

type ViewMode = 'theory' | 'practice';

const LessonDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { speak } = useTTS();
  
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<ViewMode>('theory');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    api.get(`/lessons/${id}`)
      .then(res => {
        setLesson(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Lesson not found or expired. Redirecting...");
        setTimeout(() => navigate('/lessons'), 2000);
        setLoading(false);
      });
  }, [id, navigate]);

  const handleCheck = useCallback(() => {
    const currentExercise = lesson.exercises[currentExerciseIndex];
    if (!selectedOption) return;
    
    const userAnswer = selectedOption.trim().toLowerCase();
    const correctAnswer = currentExercise.correctAnswer.trim().toLowerCase();
    const isCorrect = userAnswer === correctAnswer;
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      toast.success("Brilliant!");
    } else {
      toast.error("Not quite...");
    }

    setFeedback({
      correct: isCorrect,
      message: isCorrect ? 'Great job!' : `Correct answer: ${currentExercise.correctAnswer}`
    });
  }, [lesson, currentExerciseIndex, selectedOption]);

  const nextStep = useCallback(() => {
    setFeedback(null);
    setSelectedOption(null);
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
        const finalScore = score + (feedback?.correct ? 10 : 0);
        // Save progress to backend
        api.post(`/lessons/${id}/complete`, { score: finalScore })
            .then(() => {
                toast.success("Lesson Completed!", {
                    description: `Total XP earned: ${finalScore}`,
                    icon: <Award size={20} color="var(--primary)" />
                });
                navigate('/dashboard');
            })
            .catch(() => {
                toast.success("Lesson Completed!"); // Still show success even if XP save fails
                navigate('/lessons');
            });
    }
  }, [id, currentExerciseIndex, lesson, score, feedback, navigate]);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (mode === 'theory') {
            if (e.key === 'Enter') setMode('practice');
            return;
        }

        if (feedback) {
            if (e.key === 'Enter') nextStep();
            return;
        }

        if (lesson?.exercises[currentExerciseIndex]?.type === 'MULTIPLE_CHOICE') {
            const num = parseInt(e.key);
            const options = JSON.parse(lesson.exercises[currentExerciseIndex].options);
            if (num > 0 && num <= options.length) {
                setSelectedOption(options[num - 1]);
            }
        }

        if (e.key === 'Enter' && selectedOption) {
            handleCheck();
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, feedback, selectedOption, lesson, currentExerciseIndex, handleCheck, nextStep]);

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ border: '4px solid var(--border)', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px' }} />
    </div>
  );
  
  if (!lesson) return <div style={{ textAlign: 'center', marginTop: '4rem' }}><h2>Lesson not found</h2></div>;

  const progressPercentage = mode === 'theory' ? 0 : ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <button onClick={() => navigate('/lessons')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: 'var(--text-muted)' }}>
          <ArrowLeft size={18} /> BACK
        </button>
        <div style={{ display: 'flex', gap: '1rem' }}>
            <Tab active={mode === 'theory'} label="Theory" />
            <Tab active={mode === 'practice'} label="Practice" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'theory' ? (
          <motion.div
            key="theory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card"
            style={{ padding: '4rem' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <BookOpen size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
                <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>{lesson.title}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Master the core concepts before practicing.</p>
            </div>

            <div style={{ position: 'relative', marginBottom: '4rem' }}>
                <button 
                    onClick={() => speak(lesson.content)}
                    style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'rgba(99, 102, 241, 0.1)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', color: 'var(--primary)', cursor: 'pointer' }}
                >
                    <Volume2 size={24} />
                </button>
                <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: '#d1d5db', background: 'rgba(255,255,255,0.02)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    {lesson.content.split('\n').map((line: string, i: number) => (
                        <p key={i} style={{ marginBottom: '1rem' }}>{line}</p>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button 
                    onClick={() => setMode('practice')} 
                    className="btn-primary" 
                    style={{ padding: '1.25rem 4rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
                >
                    START PRACTICE <ChevronRight size={20} />
                </button>
            </div>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>Tip: Press [Enter] to continue</p>
          </motion.div>
        ) : (
          <motion.div
            key="practice"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="exercise-view"
          >
            {/* Progress Bar */}
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${progressPercentage}%` }} style={{ height: '100%', background: 'var(--primary)' }} />
                </div>
            </div>

            <div className="glass-card" style={{ padding: '3.5rem' }}>
                <ExerciseRenderer 
                    exercise={lesson.exercises[currentExerciseIndex]} 
                    feedback={feedback}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                    handleCheck={handleCheck}
                    nextStep={nextStep}
                    index={currentExerciseIndex}
                    total={lesson.exercises.length}
                    speak={speak}
                />
                <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>
                    Tip: Use [1-4] keys for options, [Enter] to check
                </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ active, label }: { active: boolean, label: string }) => (
    <span style={{ 
        background: active ? 'var(--primary)' : 'rgba(255,255,255,0.05)', 
        padding: '0.4rem 1rem', 
        borderRadius: '10px', 
        fontSize: '0.8rem', 
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
    }}>{label}</span>
)

const ExerciseRenderer = ({ exercise, feedback, selectedOption, setSelectedOption, handleCheck, nextStep, index, total, speak }: any) => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px' }}>EXERCISE {index + 1} / {total}</span>
                <button onClick={() => speak(exercise.question)} style={{ background: 'none', color: 'var(--primary)', cursor: 'pointer' }}>
                    <Volume2 size={20} />
                </button>
            </div>
            <h2 style={{ fontSize: '2.2rem', marginBottom: '2.5rem' }}>{exercise.question}</h2>

            {exercise.type === 'MULTIPLE_CHOICE' && (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {JSON.parse(exercise.options).map((opt: string, i: number) => (
                        <button 
                            key={opt}
                            onClick={() => !feedback && setSelectedOption(opt)}
                            disabled={!!feedback}
                            style={{
                                padding: '1.25rem',
                                textAlign: 'left',
                                borderRadius: '16px',
                                background: selectedOption === opt ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.03)',
                                border: `2px solid ${selectedOption === opt ? 'var(--primary)' : 'var(--border)'}`,
                                color: 'white',
                                fontSize: '1.1rem',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span>{opt}</span>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>[{i + 1}]</span>
                        </button>
                    ))}
                </div>
            )}

            {exercise.type === 'FILL_BLANKS' && (
                <input 
                    type="text"
                    autoFocus
                    placeholder="Enter answer..."
                    value={selectedOption || ''}
                    onChange={(e) => !feedback && setSelectedOption(e.target.value)}
                    disabled={!!feedback}
                    style={{
                        width: '100%',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: `3px solid var(--primary)`,
                        fontSize: '1.8rem',
                        color: 'white',
                        padding: '1rem',
                        textAlign: 'center',
                        outline: 'none'
                    }}
                />
            )}

            {feedback && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ marginTop: '2.5rem', padding: '1.5rem', borderRadius: '12px', background: feedback.correct ? 'rgba(16,185,129,0.1)' : 'rgba(244,63,94,0.1)', color: feedback.correct ? 'var(--accent)' : 'var(--danger)' }}>
                    <strong>{feedback.correct ? 'Correct!' : 'Correction:'}</strong>
                    <p style={{ marginTop: '0.5rem', color: 'white' }}>{exercise.explanation}</p>
                </motion.div>
            )}

            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
                {!feedback ? (
                    <button onClick={handleCheck} className="btn-primary" disabled={!selectedOption} style={{ padding: '1rem 3rem' }}>CHECK</button>
                ) : (
                    <button onClick={nextStep} className="btn-primary" style={{ padding: '1rem 3rem', background: 'var(--accent)' }}>CONTINUE</button>
                )}
            </div>
        </div>
    )
}

export default LessonDetail;
