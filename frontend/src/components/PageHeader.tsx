import React from 'react';
import { motion } from 'framer-motion';

interface PageHeaderProps {
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  badge?: string | React.ReactNode;
  centered?: boolean;
  className?: string;
  children?: React.ReactNode;
}

/**
 * PageHeader — Componente de cabecera reutilizable para las páginas de LinguaCore.
 * Centraliza el estilo de los títulos, subtítulos y badges opcionales.
 */
const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  subtitle, 
  badge, 
  centered = true, 
  children 
}) => {
  return (
    <header style={{ 
      marginBottom: '4rem', 
      textAlign: centered ? 'center' : 'left',
      display: 'flex',
      flexDirection: 'column',
      alignItems: centered ? 'center' : 'flex-start'
    }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {badge && (
          <div style={{ 
            display: 'inline-flex', 
            padding: '0.5rem 1.5rem', 
            background: 'var(--surface)', 
            borderRadius: '30px', 
            color: 'var(--primary)', 
            fontWeight: 'bold', 
            fontSize: '0.75rem', 
            gap: '0.5rem', 
            alignItems: 'center', 
            marginBottom: '1.5rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            border: '1px solid var(--border)'
          }}>
            {badge}
          </div>
        )}
        
        <h1 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          marginBottom: subtitle ? '1rem' : '0',
          lineHeight: '1.1'
        }}>
          {typeof title === 'string' && title.includes('.') ? (
            <>
              {title.split('.').slice(0, -1).join('.')}.
              <span className="gradient-text">{title.split('.').pop()}</span>
            </>
          ) : (
            title
          )}
        </h1>
        
        {subtitle && (
          <p style={{ 
            color: 'var(--text-muted)', 
            fontSize: '1.2rem',
            maxWidth: '800px',
            margin: centered ? '0 auto' : '0'
          }}>
            {subtitle}
          </p>
        )}
        
        {children && (
          <div style={{ marginTop: '2.5rem' }}>
            {children}
          </div>
        )}
      </motion.div>
    </header>
  );
};

export default PageHeader;
