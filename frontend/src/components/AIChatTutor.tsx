import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Wand2, BookOpen, Volume2 } from 'lucide-react';

const AIChatTutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your LinguaCore AI tutor. I can analyze your grammar, explain complex idioms, or even simulate a job interview. How shall we begin?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (textOverride?: string) => {
    const messageText = textOverride || input;
    if (!messageText.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: messageText }]);
    setInput('');
    setIsTyping(true);

    // AI Logic Engine (Personalized & Professional)
    setTimeout(() => {
      let response = "";
      const msg = messageText.toLowerCase();

      if (msg.includes('check') || msg.includes('email') || msg.includes('writing') || msg.includes('escribir')) {
        response = "📝 Writing Analysis: Your text is technically correct, but we can make it more impactful. I suggest using 'I am delighted to...' instead of 'I am happy to...'. This small change increases your professional tone by 40%.";
      } else if (msg.includes('traducir') || msg.includes('traduccion') || msg.includes('no entiendo') || msg.includes('translate') || msg.includes('spanish') || msg.includes('español')) {
        response = "🌍 Traduciendo para ti: ¡Claro! Para aprender desde cero lo ideal es enfocarse en el Alfabeto, los Números y el verbo 'To Be'. Te recomendaba visitar la lección 'Identity'. ¿Te gustaría que sigamos hablando en español e inglés para que entiendas mejor?";
      } else if (msg.includes('video') || msg.includes('pelicula') || msg.includes('cine')) {
        response = "🎬 Cinematic Library: ¡Buena idea! He preparado videos interactivos para practicar el abecedario y los números en nuestro 'Immersion Studio'. Puedes ir allí desde el menú principal para verlos con subtítulos inteligentes.";
      } else if (msg.includes('alfabeto') || msg.includes('abecedario') || msg.includes('alphabet')) {
        response = "🔤 The Alphabet: En inglés, la pronunciación cambia mucho. Por ejemplo: A (ei), B (bi), C (si). ¡Es la base de todo! He añadido un video de práctica en el estudio de inmersión para que escuches cada letra. ¿Te gustaría ver los números también?";
      } else if (msg.includes('numero') || msg.includes('number') || msg.includes('contar')) {
        response = "🔢 Numbers Mastery: 1 (One), 2 (Two), 3 (Three)... Hasta el 12 son únicos, luego del 13 al 19 terminan en -teen. ¿Sabías que el 0 se puede decir 'zero', 'oh' o 'nought'?";
      } else if (msg.includes('tiempo') || msg.includes('tense')) {
        response = "⏳ Verb Tenses: \n• Present: I am/do.\n• Past: I was/did.\n• Future: I will be/do.\n¡El inglés tiene 12 tiempos principales! ¿Quieres empezar por el pasado o el presente?";
      } else if (msg.includes('to be') || msg.includes('ser') || msg.includes('estar')) {
        response = "✨ Foundation Pillar: The verb 'To Be' is essential. It has three forms in present: AM (for I), IS (for he/she/it), and ARE (for you/we/they). Example: 'I am a student'. Do you want to see other tenses (tiempos verbales)?";
      } else if (msg.includes('grammar') || msg.includes('explain') || msg.includes('gramatica') || msg.includes('explicar')) {
        response = "💡 Grammar Intelligence: You're asking about grammar! A key concept is the 'Subjunctive Mood' for advanced, or 'Word Order' for beginners. In English, we usually follow Subject + Verb + Object. Would you like a specific example?";
      } else if (msg.includes('principio') || msg.includes('begin') || msg.includes('start')) {
        response = "🌱 Starting Journey: Excellent! To learn from the beginning, we should focus on the Alphabet, Numbers, and 'The Verb To Be'. Check out our 'Identity' lesson in the curriculum. I can also practice basic greetings with you now!";
      } else if (msg.includes('pronounce') || msg.includes('speak') || msg.includes('pronunciar')) {
        response = "🎙️ Phonic Insights: Focus on the 'Schwa' sound (/ə/). It's the most common sound in English and the key to sounding natural. Try saying 'Information' and notice how the 'o' is almost silent.";
      } else if (msg.includes('interview') || msg.includes('business') || msg.includes('entrevista')) {
        response = "🏢 Professional Mode: Let's prepare. A classic question is 'Tell me about yourself'. Remember to use 'Action Verbs' like 'Led', 'Coordinated', or 'Spearheaded'. Want to try a mock response?";
      } else {
        response = "That's an interesting point! As your AI tutor, I can guide you through our 'Master Book' curriculum o ayudarte a practicar lo básico como el alfabeto y los números. ¿Qué prefieres hoy?";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.9, filter: 'blur(10px)' }}
            className="glass-card"
            style={{
              width: '400px',
              height: '580px',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              border: '1px solid rgba(99, 102, 241, 0.4)',
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)'
            }}
          >
            {/* Premium Header */}
            <div style={{ padding: '1.5rem', background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.15), transparent)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 0 15px var(--primary-glow)' }}>
                  <Bot size={26} color="white" />
                  <div style={{ position: 'absolute', top: -3, right: -3, background: 'var(--accent)', padding: '2px', borderRadius: '50%' }}>
                    <Sparkles size={10} color="white" />
                  </div>
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '800' }}>LinguaCore <span className="gradient-text">Tutor</span></h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }} />
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Adaptive AI Active</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover-glow" style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }} className="custom-scrollbar">
              {messages.map((msg, i) => (
                <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}
                >
                  <div style={{
                    padding: '1rem 1.25rem',
                    borderRadius: '20px',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface-alt)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-main)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '20px',
                    borderBottomLeftRadius: msg.role === 'bot' ? '4px' : '20px',
                    boxShadow: msg.role === 'user' ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none'
                  }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'var(--surface-alt)', padding: '1rem 1.5rem', borderRadius: '20px', borderBottomLeftRadius: '4px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[0, 1, 2].map(dot => (
                        <motion.div 
                            key={dot}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: dot * 0.1 }}
                            style={{ width: '6px', height: '6px', background: 'var(--primary)', borderRadius: '50%' }}
                        />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Intelligent Suggestions Container */}
            <div style={{ padding: '0 1.5rem 1.25rem', display: 'flex', gap: '0.6rem', overflowX: 'auto', flexShrink: 0 }} className="hide-scrollbar">
                {[
                    { label: 'Writing Analysis', icon: <Wand2 size={12} /> },
                    { label: 'Grammar Deep-Dive', icon: <BookOpen size={12} /> },
                    { label: 'Pronunciation', icon: <Volume2 size={12} /> },
                    { label: 'Business Mockup', icon: <Sparkles size={12} /> }
                ].map(opt => (
                    <motion.button 
                        key={opt.label}
                        whileHover={{ y: -2, background: 'rgba(99, 102, 241, 0.2)' }}
                        onClick={() => handleSend(opt.label)}
                        style={{ 
                            whiteSpace: 'nowrap', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', 
                            padding: '0.5rem 1rem', borderRadius: '12px', fontSize: '0.75rem', color: 'var(--primary)', 
                            cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem'
                        }}
                    >
                        {opt.icon} {opt.label}
                    </motion.button>
                ))}
            </div>

            {/* Input Surface */}
            <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem', background: 'rgba(0,0,0,0.2)' }}>
              <input 
                type="text" 
                placeholder="Ask me anything in English..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{ 
                    flex: 1, background: 'var(--input-bg)', border: '1px solid var(--border)', 
                    borderRadius: '14px', padding: '0.8rem 1.2rem', color: 'var(--input-color)', 
                    outline: 'none', fontSize: '0.9rem', transition: '0.2s'
                }}
                className="focus-glow"
              />
              <button 
                onClick={() => handleSend()} 
                className="btn-primary"
                style={{ 
                    borderRadius: '14px', width: '48px', height: '48px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    padding: 0, flexShrink: 0 
                }}
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05, boxShadow: '0 15px 40px rgba(99, 102, 241, 0.6)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '70px',
          height: '70px',
          borderRadius: '22px',
          background: 'linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%)',
          border: 'none',
          color: 'white',
          boxShadow: '0 12px 35px rgba(99, 102, 241, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <AnimatePresence mode="wait">
            {isOpen ? <X size={32} key="x" /> : <MessageSquare size={32} key="msg" />}
        </AnimatePresence>
        {!isOpen && (
            <motion.div 
                animate={{ scale: [1, 1.2, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ position: 'absolute', top: -8, right: -8, background: 'var(--accent)', width: '26px', height: '26px', borderRadius: '50%', border: '4px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Sparkles size={12} color="white" />
            </motion.div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChatTutor;

