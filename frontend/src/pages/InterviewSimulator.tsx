import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, Brain, Star, Sparkles, Target, AlertCircle, 
  ArrowRight, CheckCircle2, Play, Briefcase,
  ShieldAlert, Speech, Lightbulb
} from 'lucide-react';

const InterviewSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'framework' | 'structures' | 'vocabulary' | 'simulation'>('framework');
  const [currentSimPhase, setCurrentSimPhase] = useState(0);
  const [showAnswerHint, setShowAnswerHint] = useState(false);

  const simulationPhases = [
    {
      title: "Phase 1: Introduction & Small Talk",
      objective: "The Hook. Avoid monosyllables. Use Binomials.",
      question: "How are you today?",
      hint: "I'm doing well, thank you. It’s been a bit of hustle and bustle getting here, but I’m ready and waiting to get started."
    },
    {
      title: "Phase 2: Abstract Topics Analysis",
      objective: "The Body. Use Nominalization.",
      question: "What is the impact of social media on privacy?",
      hint: "The unprecedented proliferation of digital platforms has led to a significant erosion of what we previously deemed private space."
    },
    {
      title: "Phase 3: Conflict Resolution",
      objective: "The Diplomacy. Use strategic Vague Language.",
      question: "What would you do if a colleague was lazy?",
      hint: "I would try to sound them out first. It might just be a case of them feeling a bit under the weather or perhaps they are facing some teething problems with a new task."
    }
  ];

  return (
    <div className="page-container" style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(40px)' }} />
        
        <Briefcase size={48} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
        <h1 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>C2 Interview Mastery</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Master the strategic framework, showstopper structures, and critical vocabulary needed to ace your C2 level English interview.
        </p>
      </motion.div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { id: 'framework', label: '1. Strategic Framework', icon: Target },
          { id: 'structures', label: '2. Showstopper Structures', icon: Sparkles },
          { id: 'vocabulary', label: '3. Critical Vocabulary', icon: Speech },
          { id: 'simulation', label: '4. Phase Simulation', icon: Play }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '12px',
              border: activeTab === tab.id ? '1px solid var(--primary)' : '1px solid var(--border)',
              background: activeTab === tab.id ? 'rgba(99, 102, 241, 0.1)' : 'var(--surface)',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-main)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <tab.icon size={18} /> {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'framework' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem' }}>
                  <Brain size={24} /> Flexibility
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Can you transition from a serious, analytical topic to a subtle joke effortlessly? 
                  The examiner is looking for seamless tone shifting.
                </p>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                  <ShieldAlert size={24} /> Pragmatics
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Do you know when to be direct and when to employ British understatement? 
                  Appropriacy and cultural awareness are key at C2 level.
                </p>
              </div>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', marginBottom: '1rem' }}>
                  <CheckCircle2 size={24} /> Cohesion
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  Do your ideas flow like a structured keynote speech, or do they feel like disjointed sentences? 
                  Discourse markers are your best friend here.
                </p>
              </div>
              
              <div className="glass-card" style={{ padding: '2rem', gridColumn: '1 / -1', background: 'linear-gradient(145deg, rgba(99, 102, 241, 0.05) 0%, rgba(2, 6, 23, 0) 100%)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  <Mic size={24} color="var(--primary)" /> Elocution Checklist (C2 Pronunciation)
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '1rem' }}>
                  <li style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', marginTop: '8px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)' }}>Sentence Stress:</strong>
                      <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>Ensure you emphasize the word that carries the emotional or core meaning of the sentence.</span>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', marginTop: '8px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)' }}>Intonation:</strong>
                      <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>Avoid a flat delivery. Use falling intonation at the end of statements to project authority and confidence.</span>
                    </div>
                  </li>
                  <li style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', marginTop: '8px' }} />
                    <div>
                      <strong style={{ color: 'var(--text-main)' }}>Pausing:</strong>
                      <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem' }}>Don't rush. Great communicators use 1-2 second silences before delivering the most important word.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'structures' && (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--primary)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  <span>A. Inversion for Emphasis</span>
                  <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '12px' }}>FORCE THIS</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', color: 'var(--danger)', textDecoration: 'line-through', opacity: 0.7 }}>
                    "I have never seen such a mess."
                  </div>
                  <ArrowRight size={20} color="var(--text-muted)" />
                  <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '8px', color: 'var(--success)', fontWeight: 'bold' }}>
                    "Never have I witnessed such a lack of organization."
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--accent)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  <span>B. The "Remote Possibility" Conditional</span>
                  <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '12px' }}>FORCE THIS</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', color: 'var(--danger)', textDecoration: 'line-through', opacity: 0.7 }}>
                    "If the company fails..."
                  </div>
                  <ArrowRight size={20} color="var(--text-muted)" />
                  <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '8px', color: 'var(--success)', fontWeight: 'bold' }}>
                    "Were the company to face a downturn, I would suggest..."
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--warning)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  <span>C. The Subjunctive of Importance</span>
                  <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', borderRadius: '12px' }}>FORCE THIS</span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', color: 'var(--danger)', textDecoration: 'line-through', opacity: 0.7 }}>
                    "It's important that we finish on time."
                  </div>
                  <ArrowRight size={20} color="var(--text-muted)" />
                  <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '8px', color: 'var(--success)', fontWeight: 'bold' }}>
                    "It is of the utmost importance that the project be completed within the stipulated timeframe."
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vocabulary' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={20} /> Buying Time
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', borderLeft: '2px solid var(--text-muted)' }}>
                    <p style={{ margin: 0, color: 'var(--text-main)', fontStyle: 'italic' }}>"That’s a multi-faceted question, let me collect my thoughts for a second."</p>
                  </div>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', borderLeft: '2px solid var(--text-muted)' }}>
                    <p style={{ margin: 0, color: 'var(--text-main)', fontStyle: 'italic' }}>"To put it succinctly..." <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>(To summarize)</span></p>
                  </div>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', borderLeft: '2px solid var(--text-muted)' }}>
                    <p style={{ margin: 0, color: 'var(--text-main)', fontStyle: 'italic' }}>"If we look at the broader picture..." <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>(To expand)</span></p>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--accent)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldAlert size={20} /> Diplomatic Disagreement
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', borderLeft: '2px solid var(--accent)' }}>
                    <p style={{ margin: 0, color: 'var(--text-main)', fontStyle: 'italic' }}>"I take your point, however, I’m inclined to believe that..."</p>
                  </div>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', borderLeft: '2px solid var(--accent)' }}>
                    <p style={{ margin: 0, color: 'var(--text-main)', fontStyle: 'italic' }}>"With all due respect, that might be an oversimplification of the matter."</p>
                  </div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--success)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={20} /> Emphasizing Key Points
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', borderLeft: '2px solid var(--success)' }}>
                    <p style={{ margin: 0, color: 'var(--text-main)', fontStyle: 'italic' }}>"It is arguably the most significant factor."</p>
                  </div>
                  <div style={{ padding: '1rem', background: 'var(--surface-alt)', borderRadius: '8px', borderLeft: '2px solid var(--success)' }}>
                    <p style={{ margin: 0, color: 'var(--text-main)', fontStyle: 'italic' }}>"The crux of the matter lies in..."</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'simulation' && (
            <div style={{ display: 'grid', gap: '2rem' }}>
              <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', background: 'var(--surface-alt)', borderBottom: '1px solid var(--border)' }}>
                  {simulationPhases.map((phase, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setCurrentSimPhase(idx); setShowAnswerHint(false); }}
                      style={{
                        flex: 1,
                        padding: '1rem',
                        background: currentSimPhase === idx ? 'var(--surface)' : 'transparent',
                        border: 'none',
                        borderBottom: currentSimPhase === idx ? '2px solid var(--primary)' : '2px solid transparent',
                        color: currentSimPhase === idx ? 'var(--primary)' : 'var(--text-muted)',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                      }}
                    >
                      {phase.title.split(':')[0]}
                    </button>
                  ))}
                </div>
                
                <div style={{ padding: '3rem 2rem', minHeight: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '1rem', textTransform: 'uppercase' }}>
                    {simulationPhases[currentSimPhase].title}
                  </span>
                  <h2 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                    "{simulationPhases[currentSimPhase].question}"
                  </h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                    <Target size={16} style={{ display: 'inline', verticalAlign: 'text-bottom', marginRight: '0.5rem' }}/>
                    Objective: {simulationPhases[currentSimPhase].objective}
                  </p>

                  <button
                    onClick={() => setShowAnswerHint(!showAnswerHint)}
                    className="btn-primary"
                    style={{ background: showAnswerHint ? 'transparent' : 'var(--primary)', border: showAnswerHint ? '1px solid var(--border)' : 'none', color: showAnswerHint ? 'var(--text-main)' : '#fff' }}
                  >
                    {showAnswerHint ? 'Hide C2 Example' : 'Reveal C2 Example'}
                  </button>

                  <AnimatePresence>
                    {showAnswerHint && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: 'auto', marginTop: '2rem' }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        style={{ width: '100%', maxWidth: '600px', overflow: 'hidden' }}
                      >
                        <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid var(--success)', borderRadius: '12px', color: 'var(--success)', fontWeight: '500', fontSize: '1.1rem', fontStyle: 'italic' }}>
                          <Lightbulb size={20} style={{ marginBottom: '0.5rem', display: 'block', margin: '0 auto' }}/>
                          "{simulationPhases[currentSimPhase].hint}"
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '2rem', background: 'linear-gradient(45deg, rgba(99,102,241,0.1), rgba(236,72,153,0.1))', border: '1px solid rgba(99,102,241,0.2)' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
                  <Brain size={24} color="var(--primary)" /> 
                  Quick Preparation Exercise
                </h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  Try to answer this question right now using at least <strong>one Inversion</strong> and a <strong>C2-level idiom</strong>:
                </p>
                <div style={{ padding: '1.5rem', background: 'var(--surface)', borderRadius: '12px', borderLeft: '4px solid var(--accent)', marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0 }}>
                    "How has your professional field changed in the last decade?"
                  </h4>
                </div>
                
                <details style={{ background: 'var(--surface-alt)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 'bold', color: 'var(--primary)' }}>View Hint / Skeleton Answer</summary>
                  <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6' }}>
                    "Not only has technology transformed the way we work, but it has also... [nuance]. 
                    By and large, we are now in uncharted waters regarding..."
                  </p>
                </details>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InterviewSimulator;
