import React from 'react';
import { motion } from 'framer-motion';

/**
 * Spinner — Indicador de carga reutilizable.
 * Sustituye los spinners duplicados en Dashboard, Lessons, Glossary y LessonDetail.
 */
const Spinner: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
      style={{
        border: '4px solid var(--border)',
        borderTop: '4px solid var(--primary)',
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  </div>
);

export default Spinner;
