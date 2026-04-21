import React from 'react';
import { 
    ResponsiveContainer, RadarChart, PolarGrid, 
    PolarAngleAxis, PolarRadiusAxis, Radar,
    AreaChart, Area, XAxis, YAxis, Tooltip 
} from 'recharts';
import { motion } from 'framer-motion';

interface StatsPanelProps {
    data: {
        skills: { subject: string; A: number; fullMark: number }[];
        activity: { name: string; xp: number }[];
    }
}

const StatsPanel: React.FC<StatsPanelProps> = ({ data }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {/* Skills Radar */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card" 
                style={{ padding: '2rem', minHeight: '400px' }}
            >
                <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem', color: 'var(--text-main)' }}>Skill Proficiency</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.skills}>
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} />
                        <Radar
                            name="Skills"
                            dataKey="A"
                            stroke="var(--primary)"
                            fill="var(--primary)"
                            fillOpacity={0.6}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Activity Chart */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card" 
                style={{ padding: '2rem', minHeight: '400px' }}
            >
                <h3 style={{ marginBottom: '2rem', fontSize: '1.2rem', color: 'var(--text-main)' }}>Weekly XP Velocity</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data.activity}>
                        <defs>
                            <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                            contentStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px' }}
                            itemStyle={{ color: 'var(--primary)' }}
                        />
                        <Area type="monotone" dataKey="xp" stroke="var(--primary)" fillOpacity={1} fill="url(#colorXp)" />
                    </AreaChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

export default StatsPanel;
