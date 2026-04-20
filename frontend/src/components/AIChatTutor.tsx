import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

const AIChatTutor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: "Hello! I'm your LinguaCore AI assistant. How can I help you with your English today?" }
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

    // AI Logic Engine (Simulated Sophistication)
    setTimeout(() => {
      let response = "";
      const msg = messageText.toLowerCase();

      if (msg.includes('check') || msg.includes('email') || msg.includes('writing')) {
        response = "📝 Writing Analysis: Your text is clear but could be more professional. I suggest using 'I would appreciate if...' instead of 'I want...'. Clarity Score: 85%.";
      } else if (msg.includes('grammar') || msg.includes('explain')) {
        response = "💡 Grammar Tip: In English, we use the Present Perfect ('I have seen') for actions that started in the past and continue today. Would you like some examples?";
      } else if (msg.includes('pronounce') || msg.includes('speak')) {
        response = "🎙️ Speaking Coach: To sound more native, focus on 'Linking'. Try to connect the end of one word to the beginning of the next!";
      } else {
        response = "I'm here to help! We can practice conversation, check your writing, or dive deep into the English Master Book theory. What's our next goal?";
      }
      
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="glass-card"
            style={{
              width: '380px',
              height: '500px',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bot size={24} color="white" />
                </div>
                <div>
                  <h4 style={{ margin: 0 }}>AI Tutor</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent)' }}>● Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{
                    padding: '0.8rem 1.2rem',
                    borderRadius: '18px',
                    fontSize: '0.9rem',
                    background: msg.role === 'user' ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    color: 'white',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--border)',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : '18px',
                    borderBottomLeftRadius: msg.role === 'bot' ? '4px' : '18px'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', background: 'rgba(255,255,255,0.05)', padding: '0.8rem 1.2rem', borderRadius: '18px' }}>
                  <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }}>Typing...</motion.div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            {messages.length < 3 && (
                <div style={{ display: 'flex', gap: '0.5rem', padding: '0 1.5rem 1rem', overflowX: 'auto' }}>
                    {['Check my email', 'Explain Grammar', 'Chat in English'].map(opt => (
                        <button 
                            key={opt}
                            onClick={() => handleSend(opt)}
                            style={{ 
                                whiteSpace: 'nowrap', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', 
                                padding: '0.4rem 0.8rem', borderRadius: '10px', fontSize: '0.7rem', color: 'var(--text-muted)', cursor: 'pointer' 
                            }}
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div style={{ padding: '1.25rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem' }}>
              <input 
                type="text" 
                placeholder="Ask anything..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.75rem 1rem', color: 'white', outline: 'none' }}
              />
              <button onClick={() => handleSend()} style={{ background: 'var(--primary)', border: 'none', borderRadius: '12px', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '65px',
          height: '65px',
          borderRadius: '50%',
          background: 'var(--primary)',
          border: 'none',
          color: 'white',
          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <MessageSquare size={30} />
        {!isOpen && (
            <div style={{ position: 'absolute', top: -5, right: -5, background: 'var(--danger)', width: '20px', height: '20px', borderRadius: '50%', border: '3px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={10} color="white" />
            </div>
        )}
      </motion.button>
    </div>
  );
};

export default AIChatTutor;
