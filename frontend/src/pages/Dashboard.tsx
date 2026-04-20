import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Flame, Trophy, BookOpen, Star, TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we'd fetch profile stats. For now we use the user from store
    // and fetch recommended lessons.
    api.get('/lessons')
      .then(res => {
        setStats({
          lessons: res.data.data.slice(0, 3)
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading dashboard...</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Welcome back, <span className="gradient-text">{user?.name}</span>!</h1>
        <p style={{ color: 'var(--text-muted)' }}>You're doing great. Keep up the momentum!</p>
      </header>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
        <StatCard 
            icon={<Flame color="#f59e0b" fill="#f59e0b" />} 
            value={`${user?.streak || 0} Days`} 
            label="Current Streak" 
        />
        <StatCard 
            icon={<Star color="var(--primary)" fill="var(--primary)" />} 
            value={`${user?.xp || 0} XP`} 
            label="Total Points" 
        />
        <StatCard 
            icon={<Trophy color="#10b981" />} 
            value={user?.level || 'Beginner'} 
            label="Current Rank" 
        />
        <StatCard 
            icon={<TrendingUp color="var(--accent)" />} 
            value="85%" 
            label="Avg. Accuracy" 
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Recommended Lessons */}
        <section>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem' }}>Continue Your Path</h2>
                <Link to="/lessons" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    View All <ChevronRight size={16} />
                </Link>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {stats?.lessons.map((lesson: any) => (
                    <Link key={lesson.id} to={`/lessons/${lesson.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <motion.div 
                            whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                            className="glass-card" 
                            style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                        >
                            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                    <BookOpen size={24} />
                                </div>
                                <div>
                                    <h4 style={{ marginBottom: '0.25rem' }}>{lesson.title}</h4>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lesson.category} • {lesson.level}</span>
                                </div>
                            </div>
                            <ChevronRight size={20} color="var(--text-muted)" />
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>

        {/* Daily Tasks / Sidebar */}
        <aside>
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
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>You're 200 XP away from "Intermediate" rank!</p>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: '40%', height: '100%', background: 'var(--primary)' }} />
                    </div>
                </div>
            </div>
        </aside>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="glass-card" 
    style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}
  >
    <div style={{ padding: '1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
    </div>
    <div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{label}</p>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>{value}</h3>
    </div>
  </motion.div>
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
            {done && <TrendingUp size={12} color="white" />}
        </div>
        <span style={{ fontSize: '0.9rem', textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
    </div>
)

export default Dashboard;
