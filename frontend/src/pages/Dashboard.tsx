import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Calendar, Flame, Trophy, BookOpen, Star, 
    ChevronRight, Award, 
    Zap, Target, Download, Users, Map
} from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';
import ActivityHeatmap from '../components/ActivityHeatmap';
import SmartText from '../components/SmartText';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/lessons'),
      api.get('/auth/leaderboard')
    ])
    .then(([lessonsRes, leaderboardRes]) => {
        setStats({
          lessons: lessonsRes.data.data.slice(0, 3)
        });
        setLeaderboard(leaderboardRes.data.data);
        setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  const handleDownloadCertificate = () => {
    toast.info("Preparing your professional certificate...", {
        description: "Your progress is being validated. Please wait."
    });
    setTimeout(() => {
        toast.success("Certificate Ready!", {
            description: "LinguaCore_Certificate_B2.pdf has been generated."
        });
    }, 2000);
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ border: '4px solid var(--border)', borderTop: '4px solid var(--primary)', borderRadius: '50%', width: '40px', height: '40px' }} />
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '10rem' }}>
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
            <h1 style={{ fontSize: '2.8rem', fontWeight: '800', letterSpacing: '-1px' }}>Welcome back, <span className="gradient-text">{user?.name}</span>!</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>You're in the top 5% of learners this week. Keep going!</p>
        </div>
        <button onClick={handleDownloadCertificate} className="btn-primary" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Download size={18} /> DOWNLOAD CERTIFICATE
        </button>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
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
            trend="Rank #124"
        />
        <StatCard 
            icon={<Target color="var(--accent)" />} 
            value="85%" 
            label="Avg. Accuracy" 
            trend="+5% improvement"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '2.5rem' }}>
        
        <div style={{ display: 'grid', gap: '2.5rem' }}>
            {/* Activity Map */}
            <ActivityHeatmap />

            {/* Learning Path (Visual Map) */}
            <section className="glass-card" style={{ padding: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Map size={24} color="var(--primary)" /> Learning Journey</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', paddingLeft: '2rem' }}>
                    <div style={{ position: 'absolute', left: '7px', top: '10px', bottom: '10px', width: '2px', background: 'var(--border)', borderStyle: 'dashed' }} />
                    <PathNode title="Basics & Nouns" status="completed" />
                    <PathNode title="Verb Tenses I" status="active" />
                    <PathNode title="Daily Idioms" status="locked" />
                    <PathNode title="Business Mastery" status="locked" />
                </div>
            </section>

            {/* Recommended Lessons */}
            <section>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Zap size={20} color="var(--primary)" /> Recommended for You</h2>
                </div>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {stats?.lessons.map((lesson: any) => (
                        <Link key={lesson.id} to={`/lessons/${lesson.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <motion.div 
                                whileHover={{ x: 10, background: 'rgba(255,255,255,0.03)' }}
                                className="glass-card" 
                                style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h4 style={{ marginBottom: '0.25rem', fontSize: '1.1rem' }}><SmartText>{lesson.title}</SmartText></h4>
                                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                            <SmartText>{`${lesson.category} • ${lesson.level}`}</SmartText>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight size={20} color="var(--text-muted)" />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>

        <aside style={{ display: 'grid', gap: '2.5rem' }}>
            {/* Daily Goals */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Calendar size={20} color="var(--primary)" /> Daily Goals
                </h3>
                <div style={{ display: 'grid', gap: '1.25rem' }}>
                    <TaskItem label="Completed 1 Lesson" done={true} />
                    <TaskItem label="Practiced 5 Vocabulary Words" done={false} />
                    <TaskItem label="Score 100% in a Quiz" done={false} />
                </div>
                <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Level Progress: {user?.xp || 0} / 5000 XP</p>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                        <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: '35%' }} 
                            style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }} 
                        />
                    </div>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Award size={20} color="var(--accent)" /> Achievements</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    <BadgeCard icon="🔥" label="7 Days" earned={true} />
                    <BadgeCard icon="🧠" label="Grammar" earned={true} />
                    <BadgeCard icon="🎧" label="Perfect Ear" earned={false} />
                    <BadgeCard icon="✍️" label="Pro Writer" earned={false} />
                </div>
            </div>

            {/* Leaderboard Mock */}
            <div className="glass-card" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Users size={20} color="#f59e0b" /> Leaderboard
                </h3>
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {leaderboard.map((item, index) => (
                        <LeaderboardItem 
                            key={item.id} 
                            rank={index + 1} 
                            name={item.name} 
                            xp={item.xp} 
                            isUser={item.id === user?.id} 
                        />
                    ))}
                    {leaderboard.length === 0 && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calculating global rankings...</p>}
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
            background: status === 'active' ? 'rgba(99, 102, 241, 0.1)' : 'rgba(255,255,255,0.02)',
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
    style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem', position: 'relative' }}
  >
    <div style={{ padding: '1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
    </div>
    <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{label}</p>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold' }}>{value}</h3>
        <span style={{ fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 'bold' }}>{trend}</span>
    </div>
  </motion.div>
);

const BadgeCard = ({ icon, label, earned }: any) => (
    <div style={{ 
        padding: '1rem 0.5rem', 
        borderRadius: '16px', 
        background: earned ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.01)', 
        border: `1px solid ${earned ? 'rgba(99,102,241,0.2)' : 'var(--border)'}`,
        textAlign: 'center',
        opacity: earned ? 1 : 0.4
    }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{icon}</div>
        <div style={{ fontSize: '0.7rem', fontWeight: 'bold' }}>{label}</div>
    </div>
);

const LeaderboardItem = ({ rank, name, xp, isUser }: any) => (
    <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '0.75rem 1rem', 
        borderRadius: '12px', 
        background: isUser ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
        border: isUser ? '1px solid var(--primary)' : '1px solid transparent'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontWeight: 'bold', color: rank === 1 ? '#f59e0b' : 'var(--text-muted)', width: '20px' }}>{rank}</span>
            <span style={{ fontWeight: isUser ? 'bold' : 'normal', fontSize: '0.9rem' }}>{name}</span>
        </div>
        <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>{xp} XP</span>
    </div>
);

const TaskItem = ({ label, done }: { label: string, done: boolean }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: done ? 0.6 : 1 }}>
        <div style={{ 
            width: '20px', 
            height: '20px', 
            borderRadius: '50%', 
            border: `2px solid ${done ? 'var(--accent)' : 'var(--border)'}`,
            background: done ? 'var(--accent)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {done && <Zap size={12} color="white" />}
        </div>
        <span style={{ fontSize: '0.9rem', textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
    </div>
);

export default Dashboard;
