import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, Wand2, BookOpen, Volume2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AIChatTutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your LinguaCore AI tutor. I can analyze your grammar, explain complex idioms, or even simulate a job interview. How shall we begin?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lastBotOffer, setLastBotOffer] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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
      let offer: string | null = null;
      const msg = messageText.toLowerCase();

      // Handling Contextual Affirmations (Yes, Do it, etc.)
      const isAffirmative = msg === 'si' || msg === 'sí' || msg === 'hazlo' || msg === 'claro' || msg === 'yes' || msg === 'do it' || msg === 'ok' || msg === 'okay';
      
      if (isAffirmative && lastBotOffer) {
        if (lastBotOffer === 'explore_glossary') {
            response = "📚 **Opening Glossary...** He activado el modo de exploración. Puedes buscar términos como *'Ubiquitous'*, *'Ameliorate'* o *'Fathom'*. ¿Por cuál te gustaría empezar? Soy experto en términos de nivel C1.";
            offer = null;
        } else if (lastBotOffer === 'mock_interview') {
            response = "🎙️ **Interview Mode Start:** 'Great to have you here. Tell me, how do you handle high-pressure situations at work?' (Hint: Use phrases like 'I thrive under pressure' or 'I prioritize tasks effectively').";
            offer = null;
        }
      } 
      // Detection of "Translation" or "Meaning" request
      else if (msg.includes('significa') || msg.includes('meaning') || msg.includes('que es') || msg.includes('qué es') || msg.includes('what is') || msg.includes('define')) {
        if (msg.includes('boil') || msg.includes('boll') || msg.includes('hervir')) {
            response = "🔥 **Boiling (Hervir):** Significa calentar un líquido hasta que burbujea fuertemente (100°C). En la cocina, es una técnica más agresiva que el *simmering*. \n*Example: 'The water is boiling!'*";
        } else if (msg.includes('simmer') || msg.includes('fuego lento')) {
            response = "🍲 **Simmering (Fuego lento):** Es cocinar justo por debajo del punto de ebullición (unos 94°C). Es ideal para salsas complejas.";
        } else if (msg.includes('grasp') || msg.includes('fathom') || msg.includes('entender')) {
            response = "🧠 **Grasp / Fathom:** Ambos significan entender algo complejo. 'Grasp' es más común, mientras que **'Fathom'** es más literario y avanzado (C1). \n*Example: 'I can finally grasp the concept of quantum physics'.*";
        } else if (msg.includes('hedging') || msg.includes('suavizar')) {
            response = "🛡️ **Hedging:** Es usar palabras diplomáticas (perhaps, slightly) para no sonar agresivo. Vital en negocios.";
        } else if (msg.includes('upskilling') || msg.includes('mejora')) {
            response = "📈 **Upskilling:** El proceso de aprender nuevas habilidades para estar al día en tu carrera profesional. ¡Justo lo que estás haciendo en LinguaCore!";
        } else if (msg.includes('collocation')) {
            response = "🔗 **Collocation:** Palabras que suelen ir juntas de forma natural (ej: 'make a decision' en lugar de 'do a decision').";
        } else if (msg.includes('ubiquitous') || msg.includes('ubicuo')) {
            response = "🌍 **Ubiquitous:** Algo que está en todas partes al mismo tiempo. Es un término formal avanzado. *Example: 'Smartphone technology is now ubiquitous'.*";
        } else if (msg.includes('ameliorate') || msg.includes('mejorar')) {
            response = "📈 **Ameliorate:** Es un término muy formal para decir 'hacer algo mejor'. Se asocia con mejorar situaciones difíciles. \n*Example: 'The new laws were designed to ameliorate the living conditions'.*";
        } else if (msg.includes('left') || msg.includes('izquierda') || msg.includes('dejó')) {
            response = "🧭 **Left:** Tiene dos significados principales: \n1. **Dirección:** Lo opuesto a 'Right' (izquierda). \n2. **Verbo:** Pasado de 'Leave' (irse o dejar). \n*Example: 'He turned left' o 'She left the office at 5 PM'.*";
        } else if (msg.includes('right') || msg.includes('derecha')) {
            response = "🧭 **Right:** \n1. **Dirección:** Derecha. \n2. **Correcto:** Opuesto a 'Wrong'. \n3. **Derecho:** Como en 'Human Rights'.";
        } else if (msg.includes('lift') || msg.includes('ascensor')) {
            response = "🏢 **Lift (UK):** Es la palabra británica para 'Elevator' (ascensor).";
        } else if (msg.includes('flat') || msg.includes('apartamento')) {
            response = "🏠 **Flat (UK):** Es la palabra británica para 'Apartment' (apartamento/piso).";
        } else if (msg.includes('pencil in') || msg.includes('agendar')) {
            response = "✏️ **Pencil in:** Agendar una cita o reunión de forma provisional, sabiendo que podría cambiar. \n*Example: 'Let's pencil in a meeting for Friday'.*";
        } else if (msg.includes('under the pump')) {
            response = "😰 **Under the pump:** Estar bajo mucha presión o tener mucho trabajo. Muy común en entornos de oficina avanzados.";
        } else if (msg.includes('passive') || msg.includes('pasiva')) {
            response = "🔄 **Passive Voice:** Resalta el objeto. 'The cake was eaten'. ¿Quieres ver cómo se forma el pasado pasivo?";
        } else {
            response = "🔍 Ese término suena interesante. Mi base de datos lo asocia con las lecciones de nivel avanzado. ¿Te gustaría que exploremos juntos el **Glosario de Vocabulario** para encontrar más ejemplos?";
            offer = "explore_glossary";
        }
      } 
      // Handling "I don't understand" (No entiendo)
      else if (msg.includes('no entiendo') || msg.includes('no comprende') || msg.includes('don\'t understand')) {
        response = "💡 ¡Tranquilo/a! Aprender es un proceso. ¿Es una **palabra** lo que te confunde o la **forma** en la que lo explico? Si me dices la palabra, te prometo una traducción clara.";
      }
      // Existing handlers...
      else if (msg.includes('check') || msg.includes('email') || msg.includes('writing') || msg.includes('escribir')) {
        response = "📝 Writing Analysis: Your text is technically correct, but we can make it more impactful. I suggest using 'I am delighted to...' instead of 'I am happy to...'.";
      } else if (msg.includes('traducir') || msg.includes('traduccion') || msg.includes('translate') || msg.includes('spanish') || msg.includes('español')) {
        response = "🌍 **Translation Mode:** ¡Claro! Pídeme traducir términos. ¿Sabías que 'Pencil in' significa agendar algo de forma provisional?";
      } else if (msg.includes('video') || msg.includes('pelicula') || msg.includes('cine')) {
        response = "🎬 Cinematic Library: Visita el 'Immersion Studio' para ver contenido real con subtítulos inteligentes.";
      } else if (msg.includes('alfabeto') || msg.includes('abecedario') || msg.includes('alphabet')) {
        response = "🔤 The Alphabet: A (ei), B (bi), C (si). ¿Quieres practicar el deletreo de una palabra difícil?";
      } else if (msg.includes('numero') || msg.includes('number') || msg.includes('contar')) {
        response = "🔢 Numbers Mastery: 1 (One), 2 (Two), 3 (Three)... ¿Quieres que practiquemos los números ordinales (First, Second...)?";
      } else if (msg.includes('interview') || msg.includes('business') || msg.includes('entrevista')) {
        response = "🏢 Professional Mode: ¿Quieres que simulemos una entrevista de trabajo ahora mismo?";
        offer = "mock_interview";
      } else {
        response = "That's an interesting point! Como tu tutor IA de LinguaCore, puedo explicarte términos como 'grasp', 'fathom' o ayudarte con la gramática. ¿Qué quieres aprender ahora?";
      }
      
      setLastBotOffer(offer);
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
              width: isMobile ? 'calc(100vw - 2.5rem)' : '400px',
              height: isMobile ? '70vh' : '580px',
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
                    <ReactMarkdown 
                      components={{
                        p: ({node, ...props}) => <span style={{ display: 'block', marginBottom: '0.5rem' }} {...props} />,
                        strong: ({node, ...props}) => <strong style={{ fontWeight: '900', color: msg.role === 'user' ? 'white' : 'var(--primary)' }} {...props} />,
                        code: ({node, ...props}) => <code style={{ background: 'rgba(0,0,0,0.2)', padding: '0.1rem 0.3rem', borderRadius: '4px', fontSize: '0.85em' }} {...props} />
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
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

