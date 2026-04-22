import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, Award, BookOpen, ChevronRight, 
    Volume2, Mic, MicOff 
} from 'lucide-react';
import { toast } from 'sonner';
import { useTTS } from '../hooks/useTTS';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useAuthStore } from '../store/authStore';
import ReactMarkdown from 'react-markdown';
import SmartText from '../components/SmartText';
import Spinner from '../components/Spinner';

type ViewMode = 'theory' | 'practice';

const LessonDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { speak } = useTTS();
  const { isListening, transcript, startListening, stopListening, error } = useSpeechRecognition();
  const { updateUser } = useAuthStore();
  
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<ViewMode>('theory');
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string; score?: number } | null>(null);
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
    const isSpeaking = currentExercise.type === 'SPEAKING';
    
    if (!selectedOption && !isSpeaking) return;
    
    let isCorrect = false;
    let pronunciationScore = 0;

    if (isSpeaking) {
        const target = currentExercise.correctAnswer.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
        const spoken = transcript.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"");
        
        // Simple fuzzy match: count matching words
        const targetWords = target.split(' ');
        const spokenWords = spoken.split(' ');
        const matches = targetWords.filter((w: string) => spokenWords.includes(w)).length;
        pronunciationScore = Math.round((matches / targetWords.length) * 100);
        isCorrect = pronunciationScore > 70;
    } else {
        const userAnswer = selectedOption?.trim().toLowerCase();
        const correctAnswer = currentExercise.correctAnswer.trim().toLowerCase();
        isCorrect = userAnswer === correctAnswer;
    }
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      toast.success(isSpeaking ? `Great Pronunciation! (${pronunciationScore}%)` : "Brilliant!");
    } else {
      toast.error(isSpeaking ? `Keep practicing... (${pronunciationScore}%)` : "Not quite...");
    }

    setFeedback({
      correct: isCorrect,
      score: pronunciationScore,
      message: isCorrect ? 'Great job!' : `Expected: ${currentExercise.correctAnswer}`
    });
  }, [lesson, currentExerciseIndex, selectedOption, transcript]);

  const nextStep = useCallback(() => {
    setFeedback(null);
    setSelectedOption(null);
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
    } else {
        const finalScore = score + (feedback?.correct ? 10 : 0);
        api.post(`/lessons/${id}/complete`, { score: finalScore })
            .then((res) => {
                updateUser({ xp: res.data.data.xp, streak: res.data.data.streak });
                toast.success("Lesson Completed!", {
                    description: `Total XP earned: ${finalScore}`,
                    icon: <Award size={20} color="var(--primary)" />
                });
                navigate('/dashboard');
            })
            .catch(() => {
                toast.success("Lesson Completed!");
                navigate('/lessons');
            });
    }
  }, [id, currentExerciseIndex, lesson, score, feedback, navigate]);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
        
        if (mode === 'theory') {
            if (e.key === 'Enter') setMode('practice');
            return;
        }

        if (feedback) {
            if (e.key === 'Enter') nextStep();
            return;
        }

        if (e.code === 'Space' && !isInput) {
            e.preventDefault();
            const currentExercise = lesson?.exercises[currentExerciseIndex];
            if (currentExercise) speak(currentExercise.question || currentExercise.correctAnswer);
            return;
        }

        const type = lesson?.exercises[currentExerciseIndex]?.type;
        if (type === 'MULTIPLE_CHOICE' || type === 'LISTENING') {
            const num = parseInt(e.key);
            const options = JSON.parse(lesson.exercises[currentExerciseIndex].options);
            if (num > 0 && num <= options.length) {
                setSelectedOption(options[num - 1]);
            }
        }

        if (e.key === 'Enter' && (selectedOption || type === 'SPEAKING')) {
            handleCheck();
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, feedback, selectedOption, lesson, currentExerciseIndex, handleCheck, nextStep, speak]);

  if (loading) return <Spinner />;
  
  if (!lesson) return <div style={{ textAlign: 'center', marginTop: '4rem' }}><h2>Lesson not found</h2></div>;

  const progressPercentage = mode === 'theory' ? 0 : ((currentExerciseIndex + 1) / lesson.exercises.length) * 100;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <button onClick={() => navigate('/lessons')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', border: 'none' }}>
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

            {lesson.videoUrl && (
                <div style={{ marginBottom: '3rem', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', background: '#000' }}>
                    <video 
                        src={lesson.videoUrl} 
                        controls 
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        poster="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200"
                    />
                </div>
            )}

            <div style={{ position: 'relative', marginBottom: '4rem' }}>
                <button 
                    onClick={() => speak(lesson.content)}
                    style={{ position: 'absolute', right: '1rem', top: '1rem', background: 'rgba(99, 102, 241, 0.1)', border: 'none', borderRadius: '50%', width: '45px', height: '45px', color: 'var(--primary)', cursor: 'pointer' }}
                >
                    <Volume2 size={24} />
                </button>

                <div style={{ lineHeight: '1.8', fontSize: '1.1rem', color: 'var(--text-main)', background: 'var(--surface-alt)', padding: '2.5rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                    <ReactMarkdown 
                        components={{
                            h2: ({node, ...props}) => <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', marginBottom: '1rem', color: 'var(--primary)' }} {...props} />,
                            p: ({node, ...props}) => <p style={{ marginBottom: '1.2rem' }} {...props} />,
                            ul: ({node, ...props}) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.2rem' }} {...props} />,
                            li: ({node, ...props}) => <li style={{ marginBottom: '0.5rem' }} {...props} />,
                            code: ({node, ...props}) => <code style={{ background: 'rgba(99,102,241,0.1)', color: 'var(--primary)', padding: '0.2rem 0.4rem', borderRadius: '4px', fontWeight: 'bold' }} {...props} />,
                            strong: ({node, ...props}) => <strong style={{ color: 'var(--primary)', fontWeight: '800' }} {...props} />
                        }}
                    >
                        {lesson.content}
                    </ReactMarkdown>
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
                <div style={{ height: '6px', background: 'var(--progress-track)', borderRadius: '3px', overflow: 'hidden' }}>
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
                    speakingProps={{ isListening, transcript, startListening, stopListening, error }}
                />
                <p style={{ marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center' }}>
                    Tip: Use [1-4] for options, [Space] to repeat audio, [Enter] to check
                </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ active, label }: { active: boolean; label: string }) => (
    <span style={{ 
        background: active ? 'var(--primary)' : 'var(--surface)', 
        color: active ? 'white' : 'var(--text-muted)',
        padding: '0.4rem 1rem', 
        borderRadius: '10px', 
        fontSize: '0.8rem', 
        fontWeight: 'bold',
        transition: 'all 0.3s ease'
    }}>{label}</span>
)

const ExerciseRenderer = ({ exercise, feedback, selectedOption, setSelectedOption, handleCheck, nextStep, index, total, speak, speakingProps }: any) => {
    const isListeningType = exercise.type === 'LISTENING';
    const isSpeakingType = exercise.type === 'SPEAKING';

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '900', fontSize: '0.8rem', letterSpacing: '2px' }}>
                    EXERCISE {index + 1} / {total} {isListeningType && '(LISTENING)'} {isSpeakingType && '(SPEAKING)'}
                </span>
                <button onClick={() => speak(exercise.question || exercise.correctAnswer)} style={{ background: 'rgba(99, 102, 241, 0.1)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Volume2 size={24} />
                </button>
            </div>
            
            {isListeningType ? (
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => speak(exercise.question)}
                        style={{ padding: '2rem', background: 'var(--surface-alt)', border: '2px dashed var(--primary)', borderRadius: '24px', width: '100%', cursor: 'pointer' }}
                    >
                        <Volume2 size={48} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                        <h2 style={{ fontSize: '1.8rem' }}>Listen carefully...</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Click to play or press Space</p>
                    </motion.button>
                </div>
            ) : isSpeakingType ? (
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <h4 style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Read the following aloud:</h4>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--primary)' }}>"{exercise.correctAnswer}"</h2>
                    
                    {/* Fallback for error/compatibility */}
                    {speakingProps.error && (
                        <div style={{ marginBottom: '2rem', width: '100%', maxWidth: '400px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <input 
                                    type="text"
                                    placeholder="Type the phrase to complete... / Escribe la frase..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            setSelectedOption((e.target as HTMLInputElement).value);
                                        }
                                    }}
                                    style={{ 
                                        width: '100%', padding: '1rem', borderRadius: '12px', 
                                        background: 'var(--surface-alt)', border: '1px solid var(--primary)',
                                        color: 'var(--text-main)', outline: 'none', fontSize: '1rem'
                                    }}
                                />
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    Speech Offline: You can type as a fallback. Press Enter to process.
                                </p>
                            </div>
                        </div>
                    )}
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                        <motion.button 
                            animate={{ scale: speakingProps.isListening ? [1, 1.1, 1] : 1 }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            onMouseDown={speakingProps.startListening}
                            onMouseUp={speakingProps.stopListening}
                            style={{ 
                                width: '80px', height: '80px', borderRadius: '50%',
                                background: speakingProps.isListening ? 'var(--danger)' : 'var(--primary)',
                                border: 'none', color: 'white', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: speakingProps.isListening ? '0 0 20px rgba(244, 63, 94, 0.4)' : '0 0 20px rgba(99, 102, 241, 0.4)'
                            }}
                        >
                            {speakingProps.isListening ? <MicOff size={32} /> : <Mic size={32} />}
                        </motion.button>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            {speakingProps.isListening ? 'Listening...' : 'Hold to speak'}
                        </p>
                        
                        {speakingProps.transcript && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '1rem', background: 'var(--surface)', borderRadius: '12px' }}>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>You said: </span>
                                <span style={{ fontWeight: 'bold' }}>"{speakingProps.transcript}"</span>
                            </motion.div>
                        )}
                        {speakingProps.error && (
                            <p style={{ color: 'var(--danger)', fontSize: '0.85rem', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                {speakingProps.error}
                            </p>
                        )}
                    </div>
                </div>
            ) : (
                <h2 style={{ fontSize: '2.2rem', marginBottom: '2.5rem' }}><SmartText>{exercise.question}</SmartText></h2>
            )}

            {(exercise.type === 'MULTIPLE_CHOICE' || exercise.type === 'LISTENING') && (
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
                                background: selectedOption === opt ? 'rgba(99, 102, 241, 0.1)' : 'var(--surface)',
                                border: `2px solid ${selectedOption === opt ? 'var(--primary)' : 'var(--border)'}`,
                                color: 'var(--text-main)',
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
                        color: 'var(--input-color)',
                        padding: '1rem',
                        textAlign: 'center',
                        outline: 'none'
                    }}
                />
            )}

            {feedback && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ marginTop: '2.5rem', padding: '2rem', borderRadius: '20px', background: feedback.correct ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.08)', border: `1px solid ${feedback.correct ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: feedback.correct ? 'var(--accent)' : 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                                {feedback.correct ? <Award size={18} /> : <BookOpen size={18} />}
                            </div>
                            <strong style={{ fontSize: '1.1rem', color: feedback.correct ? 'var(--accent)' : 'var(--danger)' }}>
                                {feedback.correct ? 'EXCELLENT' : 'TRANSFORMATION NEEDED'}
                            </strong>
                        </div>
                        {feedback.score !== undefined && feedback.score > 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 'bold' }}>ACCURACY: {feedback.score}%</span>}
                    </div>
                    <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '14px', border: '1px solid var(--border)' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: '900', letterSpacing: '1px' }}>Pedagogical Insight:</p>
                        <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: '1.6' }}><SmartText>{exercise.explanation}</SmartText></p>
                    </div>
                </motion.div>
            )}

            <div style={{ marginTop: '4rem', display: 'flex', justifyContent: 'flex-end' }}>
                {!feedback ? (
                    <button onClick={handleCheck} className="btn-primary" disabled={!isSpeakingType && !selectedOption} style={{ padding: '1rem 3rem' }}>CHECK</button>
                ) : (
                    <button onClick={nextStep} className="btn-primary" style={{ padding: '1rem 3rem', background: 'var(--accent)' }}>CONTINUE</button>
                )}
            </div>
        </div>
    )
}

export default LessonDetail;
