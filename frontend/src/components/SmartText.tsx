import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslationDict } from '../context/TranslationContext';

interface SmartTextProps {
  children: string;
  style?: React.CSSProperties;
}

const SmartText: React.FC<SmartTextProps> = ({ children, style }) => {
  const { dictionary } = useTranslationDict();
  
  if (!children || typeof children !== 'string') return <>{children}</>;

  // Get keys sorted by length (desc) to match longest phrases first (e.g., "break the ice" before "ice")
  const keys = Object.keys(dictionary).sort((a, b) => b.length - a.length);
  
  if (keys.length === 0) return <>{children}</>;

  // Create a regex to find any of the keys. We escape potential regex chars in keys.
  const escapedKeys = keys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escapedKeys.join('|')})\\b`, 'gi');

  const parts = children.split(regex);
  const matches = children.match(regex) || [];

  const result: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    result.push(<span key={`p-${i}`}>{part}</span>);
    if (i < matches.length) {
      const match = matches[i];
      const translation = dictionary[match.toLowerCase()];
      result.push(
        <TranslatableWord 
            key={`m-${i}`} 
            word={match} 
            translation={translation} 
        />
      );
    }
  });

  return (
    <span style={{ ...style }}>
      {result}
    </span>
  );
};

const TranslatableWord = ({ word, translation }: { word: string, translation: string }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <span 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        position: 'relative', 
        color: 'var(--primary)', 
        fontWeight: 'bold',
        cursor: 'help',
        borderBottom: '1.5px dashed var(--primary)',
        display: 'inline-block',
        margin: '0 2px'
      }}
    >
      {word}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, y: 5, scale: 0.9 }}
            animate={{ opacity: 1, y: -5, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            style={{
              position: 'absolute',
              bottom: '120%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'var(--accent)',
              color: 'white',
              padding: '0.6rem 1rem',
              borderRadius: '12px',
              fontSize: '0.85rem',
              fontWeight: '800',
              whiteSpace: 'nowrap',
              zIndex: 1000,
              boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
              pointerEvents: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'inline-block'
            }}
          >
            {translation}
            <span style={{ position: 'absolute', bottom: '-6px', left: '50%', transform: 'translateX(-50%)', borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: '6px solid var(--accent)', display: 'block' }} />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
};

export default SmartText;
