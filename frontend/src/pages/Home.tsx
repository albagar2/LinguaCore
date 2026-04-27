import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, Mic, ShieldCheck, Globe, Trophy } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import './Home.css';

const Home: React.FC = () => {
  const { token } = useAuthStore();
  const [selectedFeature, setSelectedFeature] = React.useState<any>(null);

  const features = [
    {
        id: 'voice',
        icon: <Mic size={48} color="var(--primary)" />,
        title: "Neural Voice Engine",
        shortDesc: "High-fidelity speech recognition with real-time phoneme correction.",
        longDesc: "Our proprietary neural engine doesn't just listen; it understands. It breaks down your speech into phonemes and compares them against thousands of native samples. You'll get precise feedback on intonation, stress, and rhythm, allowing you to sound like a native in weeks, not years.",
        color: "var(--primary)"
    },
    {
        id: 'srs',
        icon: <Zap size={48} color="#f59e0b" />,
        title: "SRS Intelligence",
        shortDesc: "Adaptive spaced-repetition algorithms for 4x faster retention.",
        longDesc: "Based on the latest cognitive science, our SRS Intelligence predicts the 'forgetting curve' of your brain. By calculating the optimal moment to review each word, we ensure information moves from short-term to long-term memory with 400% more efficiency than traditional methods.",
        color: "#f59e0b"
    },
    {
        id: 'mastery',
        icon: <Target size={48} color="#10b981" />,
        title: "Immersive Mastery",
        shortDesc: "Context-aware challenges that simulate real-world environments.",
        longDesc: "Stop learning in a vacuum. Our immersive scenarios place you in high-stakes professional negotiations, clinical debates, or casual social settings. The AI adapts its vocabulary and complexity to match your current level, pushing you just enough to grow without feeling overwhelmed.",
        color: "#10b981"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1] 
        } 
    }
  };

  return (
    <div className="home-container">
      {/* Dynamic Background */}
      <div className="mesh-gradient" />
      <div className="dark-overlay" />
      
      {/* Decorative Floating Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: 'absolute', top: '10%', left: '5%', width: '300px', height: '300px', background: 'var(--primary)', borderRadius: '50%', filter: 'blur(100px)', zIndex: -1 }}
      />
      <motion.div 
        animate={{ y: [0, 20, 0], opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ position: 'absolute', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(120px)', zIndex: -1 }}
      />

      <div className="container home-content">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
        >
            <motion.div variants={itemVariants} className="badge-sparkle">
                <Sparkles size={16} /> THE FUTURE OF LANGUAGE LEARNING
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="hero-title">
              Master English with <br />
              <span className="gradient-text">Absolute Precision.</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="hero-description">
              Experience an AI-powered ecosystem designed to sharpen your speaking, writing, and comprehension through high-stakes interactive practice.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-actions">
                <Link to={token ? "/dashboard" : "/register"} className="btn-primary btn-hero-main">
                    {token ? "ENTER DASHBOARD" : "START YOUR JOURNEY"} <ArrowRight size={22} className="btn-icon-right" />
                </Link>
                <Link to="/lessons" className="btn-secondary-glass shine-effect">
                    EXPLORE COURSES
                </Link>
            </motion.div>

            {/* Stats / Trust Banner */}
            <motion.div variants={itemVariants} className="stats-banner">
                <Stat icon={<Globe size={18} />} label="Global Reach" value="120+ Countries" />
                <Stat icon={<ShieldCheck size={18} />} label="AI Accuracy" value="99.2% Score" />
                <Stat icon={<Trophy size={18} />} label="Active Students" value="45K+ Users" />
            </motion.div>

            {/* Feature Highlights Grid */}
            <div className="features-grid">
                {features.map((f, i) => (
                    <FeatureCard 
                        key={f.id}
                        icon={f.icon} 
                        title={f.title} 
                        desc={f.shortDesc} 
                        delay={0.1 * (i + 1)}
                        onClick={() => setSelectedFeature(f)}
                    />
                ))}
            </div>
        </motion.div>
      </div>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature && (
            <div className="modal-overlay" onClick={() => setSelectedFeature(null)}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="glass-card feature-modal"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="modal-close" onClick={() => setSelectedFeature(null)}>×</div>
                    <div className="modal-header">
                        <div className="modal-icon-box" style={{ background: `${selectedFeature.color}15`, borderColor: `${selectedFeature.color}30` }}>
                            {selectedFeature.icon}
                        </div>
                        <h2 className="modal-title">{selectedFeature.title}</h2>
                    </div>
                    <p className="modal-long-desc">{selectedFeature.longDesc}</p>
                    <div className="modal-footer">
                        <button className="btn-primary" onClick={() => setSelectedFeature(null)}>GOT IT</button>
                    </div>
                </motion.div>
            </div>
        )}
      </AnimatePresence>

      <div className="hero-glow" />
    </div>
  );
};

const Stat = ({ icon, label, value }: any) => (
    <div className="stat-item">
        <div className="stat-icon">{icon}</div>
        <div className="stat-info">
            <div className="stat-value">{value}</div>
            <div className="stat-label">{label}</div>
        </div>
    </div>
);

const FeatureCard = ({ icon, title, desc, delay, onClick }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        whileHover={{ y: -15, scale: 1.02 }}
        onClick={onClick}
        className="feature-card-wrapper"
    >
        <div className="glass-card feature-card-item">
            <div className="feature-icon-wrapper">
                {icon}
            </div>
            <div className="feature-content-box">
                <h3 className="feature-title">{title}</h3>
                <p className="feature-desc">{desc}</p>
            </div>
            <div className="feature-link">
                LEARN MORE <ArrowRight size={16} />
            </div>
        </div>
    </motion.div>
);

export default Home;
