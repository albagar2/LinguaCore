import React from 'react';
import { motion } from 'framer-motion';

const ActivityHeatmap: React.FC = () => {
  // Mock data for 12 weeks of activity
  const weeks = 15;
  const days = 7;
  
  const getActivityLevel = () => Math.floor(Math.random() * 4); // 0 to 3

  const colors = [
    'rgba(255,255,255,0.05)', // Level 0
    '#312e81',              // Level 1
    '#4338ca',              // Level 2
    '#6366f1'               // Level 3
  ];

  return (
    <div className="glass-card" style={{ padding: '2rem', overflowX: 'auto' }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        Learning Consistency
      </h3>
      <div style={{ display: 'flex', gap: '4px' }}>
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {Array.from({ length: days }).map((_, d) => {
              const level = getActivityLevel();
              return (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (w * 7 + d) * 0.005 }}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '2px',
                    background: colors[level],
                    cursor: 'pointer'
                  }}
                  whileHover={{ scale: 1.5, zIndex: 10 }}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        <span>Last 90 days</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>Less</span>
          {colors.map(c => <div key={c} style={{ width: '10px', height: '10px', background: c, borderRadius: '2px' }} />)}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityHeatmap;
