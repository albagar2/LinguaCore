import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Terminal, User, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

const Documentation: React.FC = () => {
  const [docType, setDocType] = useState<'user' | 'dev'>('user');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoc();
  }, [docType]);

  const fetchDoc = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/docs/${docType}`);
      setContent(res.data.data);
    } catch (err: any) {
      toast.error("Failed to load documentation. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '10rem' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>System <span className="gradient-text">Documentation</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Exclusive administrative manuals and architectural guides.</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--glass)', padding: '0.4rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <DocTab active={docType === 'user'} icon={<User size={16} />} label="User Manual" onClick={() => setDocType('user')} />
            <DocTab active={docType === 'dev'} icon={<Terminal size={16} />} label="Dev Manual" onClick={() => setDocType('dev')} />
        </div>
      </header>

      <div className="glass-card" style={{ padding: '4rem', minHeight: '600px' }}>
        {loading ? (
             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '1rem' }}>
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><RefreshCw color="var(--primary)" size={40} /></motion.div>
                <p style={{ color: 'var(--text-muted)' }}>Fetching secure documentation...</p>
             </div>
        ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="markdown-content">
                <ReactMarkdown>{content}</ReactMarkdown>
            </motion.div>
        )}
      </div>

      <style>{`
        .markdown-content h1 { font-size: 2.5rem; margin-bottom: 2rem; border-bottom: 2px solid var(--border); padding-bottom: 1rem; color: var(--primary); }
        .markdown-content h2 { font-size: 1.8rem; margin-top: 3rem; margin-bottom: 1.5rem; color: var(--text-main); }
        .markdown-content h3 { font-size: 1.4rem; margin-top: 2rem; color: var(--text-main); }
        .markdown-content p { margin-bottom: 1.5rem; line-height: 1.8; color: var(--text-muted); font-size: 1.1rem; }
        .markdown-content ul, .markdown-content ol { margin-bottom: 2rem; padding-left: 1.5rem; color: var(--text-muted); }
        .markdown-content li { margin-bottom: 0.75rem; }
        .markdown-content code { background: rgba(255,255,255,0.05); padding: 0.2rem 0.5rem; borderRadius: 6px; font-family: monospace; color: var(--secondary); }
        .markdown-content pre { background: #010409; padding: 2rem; border-radius: 16px; overflow-x: auto; margin: 2rem 0; border: 1px solid var(--border); }
        .markdown-content pre code { background: none; padding: 0; color: #e6edf3; }
        .markdown-content blockquote { border-left: 4px solid var(--primary); padding-left: 1.5rem; margin: 2rem 0; font-style: italic; color: var(--text-main); }
      `}</style>
    </div>
  );
};

const DocTab = ({ active, icon, label, onClick }: any) => (
    <button 
        onClick={onClick}
        style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.25rem', borderRadius: '12px',
            background: active ? 'var(--primary)' : 'transparent', color: active ? 'white' : 'var(--text-muted)',
            fontSize: '0.85rem', fontWeight: 'bold', transition: 'all 0.3s'
        }}
    >
        {icon} {label}
    </button>
)

export default Documentation;
