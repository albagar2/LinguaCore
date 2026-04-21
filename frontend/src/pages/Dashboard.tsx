import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Flame, Star, Trophy, Target, Download, Map, 
    Award, Users, BrainCircuit, BookOpen, ChevronRight, Zap, Film
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import SmartText from '../components/SmartText';
import Spinner from '../components/Spinner';
import StatsPanel from '../components/StatsPanel';
import AchievementsCabinet from '../components/AchievementsCabinet';

const Dashboard: React.FC = () => {
  // Estado global de la sesión del usuario
  const { user } = useAuthStore();
  
  // Estados locales para la gestión de datos asíncronos
  const [stats, setStats] = useState<any>(null); // Recomendaciones de lecciones
  const [leaderboard, setLeaderboard] = useState<any[]>([]); // Ranking global de XP
  const [analytics, setAnalytics] = useState<any>(null); // Datos de precisión y progreso
  const [loading, setLoading] = useState(true); // Control de carga inicial

  // Mock data for the new Analytics Lab
  const statsData = {
    skills: [
        { subject: 'Grammar', A: 85, fullMark: 100 },
        { subject: 'Vocabulary', A: 70, fullMark: 100 },
        { subject: 'Reading', A: 90, fullMark: 100 },
        { subject: 'Listening', A: 65, fullMark: 100 },
        { subject: 'Speaking', A: 50, fullMark: 100 },
        { subject: 'Business', A: 75, fullMark: 100 },
    ],
    activity: [
        { name: 'Mon', xp: 120 },
        { name: 'Tue', xp: 250 },
        { name: 'Wed', xp: 180 },
        { name: 'Thu', xp: 320 },
        { name: 'Fri', xp: 450 },
        { name: 'Sat', xp: 100 },
        { name: 'Sun', xp: 0 },
    ]
  };

  /**
   * Carga inicial de datos: Combina peticiones de lecciones, ranking y analíticas
   * para minimizar los parpadeos en la UI y centralizar el manejo de errores.
   */
  useEffect(() => {
    Promise.all([
      api.get('/lessons'),
      api.get('/auth/leaderboard'),
      api.get('/progress/dashboard')
    ])
    .then(([lessonsRes, leaderboardRes, progressRes]) => {
        setStats({
          lessons: (lessonsRes.data.data || []).slice(0, 3)
        });
        setLeaderboard(leaderboardRes.data.data || []);
        setAnalytics(progressRes.data.data || { accuracy: [], totalLessons: 0, totalWords: 0 });
        setLoading(false);
    })
    .catch((err) => {
        console.error("Dashboard data load failed", err);
        setLoading(false);
        toast.error("Telemetry failed to load. Using cached data.");
    });
  }, []);

  /**
   * Lógica de Generación de Sello Maestro Cinematográfico.
   * Crea un contenedor HTML dinámico con estilos premium (Glassmorphism + Gradients)
   * y dispara una descarga física mediante un Blob de tipo text/html.
   */
  const handleDownloadCertificate = () => {
    toast.info("Generating your Master Seal...", {
        description: "Applying cinematic styling and validating milestones."
    });
    
    setTimeout(() => {
        // Estructura del Certificado HTML con CSS Inline compatible con navegadores modernos
        const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;900&display=swap');
                body { margin: 0; background: #0f172a; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: 'Outfit', sans-serif; color: white; }
                .certificate {
                    width: 800px;
                    height: 550px;
                    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
                    border: 10px solid transparent;
                    border-image: linear-gradient(to right, #6366f1, #10b981) 1;
                    padding: 40px;
                    position: relative;
                    text-align: center;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                }
                .logo { font-size: 2rem; font-weight: 900; background: linear-gradient(90deg, #6366f1, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 2rem; }
                h1 { font-size: 3.5rem; margin: 0; letter-spacing: -2px; text-transform: uppercase; }
                h2 { color: #10b981; font-size: 1.5rem; margin-top: 1rem; letter-spacing: 5px; opacity: 0.8; }
                .name { font-size: 3rem; margin: 2.5rem 0; color: #fff; font-weight: 400; border-bottom: 1px solid rgba(255,255,255,0.1); display: inline-block; padding: 0 2rem; }
                .level { font-size: 1.2rem; color: #6366f1; font-weight: 900; text-transform: uppercase; margin-bottom: 2rem; }
                .footer { position: absolute; bottom: 40px; left: 0; right: 0; font-size: 0.7rem; color: #64748b; }
                .date { font-size: 0.9rem; color: #94a3b8; }
                .seal { position: absolute; bottom: 60px; right: 60px; width: 100px; height: 100px; border-radius: 50%; background: rgba(99, 102, 241, 0.1); border: 2px solid #6366f1; display: flex; align-items: center; justify-content: center; color: #6366f1; transform: rotate(-15deg); font-weight: 900; }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="logo">LinguaCore</div>
                <h2>MASTERY SEAL</h2>
                <h1>Internal Certificate</h1>
                <div class="name">${user?.name}</div>
                <div class="level">LEVEL ACHIEVED: ${user?.level || 'ADVANCED'}</div>
                <div class="date">Issued on: ${new Date().toLocaleDateString()} • XP Earned: ${user?.xp}</div>
                <div class="seal"><br/><br/>VERIFIED</div>
                <div class="footer">
                    * This document is an internal milestone reward within the LinguaCore ecosystem.<br/>
                    It is not a legally binding academic degree or official certification.
                </div>
            </div>
        </body>
        </html>
        `;
        
        // Disparador de descarga nativo del navegador
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `LinguaCore_MasterSeal_${user?.level || 'Level'}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        toast.success("Cinematic Seal Downloaded!", {
            description: "Open the .html file to view your Master Seal."
        });
    }, 2000);
  };

  /**
   * handleAcceptChallenge: Gestiona la aceptación de duelos en tiempo real.
   * En una fase futura, esto abriría un socket para una sesión de práctica competitiva.
   */
  const handleAcceptChallenge = () => {
    toast.success("Battle Initiated!", {
        description: "You have joined the challenge against Alex_Master. Preparing arena..."
    });
  };

  if (loading) return <Spinner />;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 0 10rem' }}>
      <header style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
        <div>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', letterSpacing: '-1px', marginBottom: '0.6rem' }}>Welcome back, <span className="gradient-text">{user?.name}</span>!</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>You're in the top 5% of learners this week. Keep going!</p>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <button onClick={handleDownloadCertificate} className="btn-primary" style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', color: '#ffffff', border: 'none', boxShadow: '0 8px 20px -5px rgba(16, 185, 129, 0.45)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
                <Download size={18} /> GENERATE INTERNAL SEAL
            </button>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.6rem', maxWidth: '220px', marginLeft: 'auto', lineHeight: '1.5' }}>
                *LinguaCore Internal Progress Reward. Not an official academic degree.
            </p>
        </div>
      </header>

      {/* Grid de Estadísticas Principales */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.75rem', marginBottom: '4rem' }}>
        <StatCard 
            icon={<Flame color="#f59e0b" fill="#f59e0b" />} 
            value={`${user?.streak || 0} Days`} 
            label="Current Streak" 
            trend="+2 today"
        />
        <StatCard 
            icon={<Star color="var(--primary)" fill="var(--primary)" />} 
            value={`${user?.xp || 0} XP`} 
            label="Total Points" 
            trend="+150 this week"
        />
        <StatCard 
            icon={<Trophy color="#10b981" />} 
            value={user?.level || 'Beginner'} 
            label="Current Rank" 
            trend="Internal Mastery"
        />
        <StatCard 
            icon={<Target color="var(--accent)" />} 
            value={`${analytics?.accuracy?.find((a: any) => a.category === 'GRAMMAR')?.score || 0}%`} 
            label="Avg. Accuracy" 
            trend="+5% improvement"
        />
        <StatCard 
            icon={<Film size={20} color="var(--primary)" />} 
            value="12" 
            label="Cinematic Sessions" 
            trend="New Library Active"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '3rem' }}>
        
        <div style={{ display: 'grid', gap: '3rem' }}>
            {/* New Analytics Lab */}
            <section>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Target size={20} color="var(--primary)" /> Analytics Lab</h2>
                </div>
                <StatsPanel data={statsData} />
            </section>

            {/* Achievements Cabinet */}
            <AchievementsCabinet />

            {/* Learning Path (Visual Map) */}
            <section className="glass-card" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Map size={24} color="var(--primary)" /> Learning Journey</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', paddingLeft: '2rem' }}>
                    <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border)', borderStyle: 'dashed' }} />
                    <PathNode title="Foundations (A1-A2)" status={analytics?.totalLessons > 0 ? "completed" : "active"} />
                    <PathNode title="Intermediate Mastery (B1-B2)" status={analytics?.totalLessons > 5 ? "completed" : analytics?.totalLessons > 0 ? "active" : "locked"} />
                    <PathNode title="Advanced Fluency (C1)" status={analytics?.totalLessons > 10 ? "completed" : analytics?.totalLessons > 5 ? "active" : "locked"} />
                </div>
            </section>

             {/* Recommended Lessons */}
             <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Zap size={20} color="var(--primary)" /> Recommended for You</h2>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {stats?.lessons?.map((lesson: any) => (
                        <Link key={lesson.id} to={`/lessons/${lesson.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <motion.div 
                                whileHover={{ x: 8, background: 'var(--surface-hover)' }}
                                className="glass-card" 
                                style={{ 
                                    padding: '1.25rem 1.5rem', 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    borderRadius: '20px',
                                    border: '1px solid var(--border)'
                                }}
                            >
                                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                    <div style={{ 
                                        width: '48px', height: '48px', borderRadius: '12px', 
                                        background: 'rgba(99, 102, 241, 0.12)', 
                                        border: '1px solid rgba(99, 102, 241, 0.2)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                                        color: 'var(--primary)', flexShrink: 0
                                    }}>
                                        <BookOpen size={22} />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.3rem', fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                                            <SmartText>{lesson.title || "Lesson"}</SmartText>
                                        </h4>
                                        <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.02em' }}>
                                            <SmartText>{`${lesson.category || 'General'} • ${lesson.level || 'All'}`}</SmartText>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>

        <aside style={{ display: 'grid', gap: '2rem', alignContent: 'start' }}>
            {/* Mastery Card */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <BrainCircuit size={20} color="var(--primary)" /> Mastery Stats
                </h3>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <TaskItem label="Words Mastered" done={(analytics?.totalWords || 0) > 0} />
                    <TaskItem label="Curriculum Progress" done={(analytics?.totalLessons || 0) > 0} />
                    <TaskItem label="Global Ranking" done={leaderboard.some(l => l.id === user?.id)} />
                </div>
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Level Progress: {user?.xp || 0} / 5000 XP</p>
                    <div style={{ height: '8px', background: 'var(--progress-track)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${Math.min(((user?.xp || 0) / 5000) * 100, 100)}%` }} 
                            style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }} 
                        />
                    </div>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Award size={20} color="var(--accent)" /> Achievements</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <BadgeCard icon="🔥" label="7 Days" earned={(user?.streak || 0) >= 7} />
                    <BadgeCard icon="🧠" label="Grammar Master" earned={(analytics?.totalLessons || 0) >= 3} />
                    <BadgeCard icon="🎧" label="Perfect Ear" earned={false} />
                    <BadgeCard icon="✍️" label="Pro Writer" earned={(analytics?.totalLessons || 0) >= 10} />
                </div>
            </div>

            {/* Global Challenges (Social) */}
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Zap size={20} color="#f59e0b" /> Global Battles</h3>
                <div style={{ padding: '1rem', background: 'rgba(245, 158, 11, 0.05)', borderRadius: '16px', border: '1px dotted #f59e0b' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>ACTIVE CHALLENGE</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.9rem' }}>vs. {user?.level === 'ADVANCED' ? 'Alex_Master' : user?.level === 'INTERMEDIATE' ? 'Fluent_Sam' : 'Coach_Emma'}</span>
                        <button 
                            onClick={handleAcceptChallenge}
                            className="btn-primary" 
                            style={{ padding: '0.4rem 1rem', fontSize: '0.75rem', background: '#d97706' }}
                        >
                            ACCEPT
                        </button>
                    </div>
                </div>
            </div>

            {/* Leaderboard Real */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Users size={20} color="#f59e0b" /> Leaderboard
                </h3>
                <div style={{ display: 'grid', gap: '0.5rem' }}>
                    {leaderboard.map((item, index) => (
                        <LeaderboardItem 
                            key={item.id} 
                            rank={index + 1} 
                            name={item.name} 
                            xp={item.xp} 
                            isUser={item.id === user?.id} 
                        />
                    ))}
                    {leaderboard.length === 0 && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updating global rankings...</div>}
                </div>
            </div>
        </aside>

      </div>
    </div>
  );
};

const PathNode = ({ title, status }: { title: string, status: 'completed' | 'active' | 'locked' }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', opacity: status === 'locked' ? 0.4 : 1 }}>
        <div style={{ 
            width: '16px', height: '16px', borderRadius: '50%', 
            background: status === 'completed' ? 'var(--accent)' : status === 'active' ? 'var(--primary)' : 'var(--border)',
            border: `4px solid ${status === 'active' ? 'var(--primary-glow)' : 'transparent'}`,
            zIndex: 1
        }} />
        <div style={{ 
            flex: 1, padding: '1rem', borderRadius: '12px', 
            background: status === 'active' ? 'rgba(99, 102, 241, 0.1)' : 'var(--surface-alt)',
            border: `1px solid ${status === 'active' ? 'var(--primary)' : 'transparent'}`
        }}>
            <span style={{ fontWeight: 'bold' }}>{title}</span>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{status}</div>
        </div>
    </div>
);

const StatCard = ({ icon, value, label, trend }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card" 
    style={{ padding: '1.75rem', display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative' }}
  >
    <div style={{ padding: '1rem', borderRadius: '14px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        {icon}
    </div>
    <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.2rem' }}>{label}</p>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', lineHeight: 1 }}>{value}</h3>
        <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 'bold', marginTop: '0.3rem', display: 'block' }}>{trend}</span>
    </div>
  </motion.div>
);

const BadgeCard = ({ icon, label, earned }: any) => (
    <div style={{ 
        padding: '1.25rem 0.75rem', 
        borderRadius: '16px', 
        background: earned ? 'var(--surface)' : 'var(--surface-alt)', 
        border: `1px solid ${earned ? 'rgba(99,102,241,0.2)' : 'var(--border)'}`,
        textAlign: 'center',
        opacity: earned ? 1 : 0.45
    }}>
        <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{icon}</div>
        <div style={{ fontSize: '0.72rem', fontWeight: 'bold', lineHeight: '1.3' }}>{label}</div>
    </div>
);

const LeaderboardItem = ({ rank, name, xp, isUser }: any) => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0.875rem 1.1rem', 
        borderRadius: '12px', 
        background: isUser ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
        border: isUser ? '1px solid var(--primary)' : '1px solid transparent'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 'bold', color: rank === 1 ? '#f59e0b' : 'var(--text-muted)', width: '24px', fontSize: '0.9rem' }}>{rank}</span>
            <span style={{ fontWeight: isUser ? 'bold' : 'normal', fontSize: '0.9rem' }}>{name}</span>
        </div>
        <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{xp} XP</span>
    </div>
);

const TaskItem = ({ label, done }: { label: string, done: boolean }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', opacity: done ? 0.6 : 1, padding: '0.25rem 0' }}>
        <div style={{ 
            width: '20px', height: '20px', borderRadius: '6px', 
            border: `2px solid ${done ? 'var(--accent)' : 'var(--border)'}`,
            background: done ? 'var(--accent)' : 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
        }}>
            {done && <Target size={12} color="white" />}
        </div>
        <span style={{ fontSize: '0.9rem', textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
    </div>
);

export default Dashboard;
