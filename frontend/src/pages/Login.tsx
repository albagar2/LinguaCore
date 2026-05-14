import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Mail, Lock, LogIn, Eye, EyeOff, Info } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/login', data);
      setAuth(response.data.user, response.data.token, data.isGuest || false);
      toast.success(`Welcome back, ${response.data.user.name}! ${data.isGuest ? '(Guest Mode)' : ''}`);
      navigate('/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Authentication failed. Please check your credentials.';
      toast.error(message);
    }
  };

  const handleGuestLogin = async () => {
    setValue('email', 'admin@linguacore.com');
    setValue('password', 'admin123');
    
    // Trigger login with isGuest flag
    onSubmit({ email: 'admin@linguacore.com', password: 'admin123', isGuest: true });
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '75vh',
      padding: '3rem 1rem',
      background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent)',
    }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '440px', padding: '3rem' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '64px', 
            height: '64px', 
            background: 'var(--primary)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1.5rem',
            boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
          }}>
            <LogIn color="white" size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Login</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Enter your credentials to access your path</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                {...register('email')}
                placeholder="name@example.com"
                style={{ 
                  width: '100%', 
                  padding: '0.875rem 0.875rem 0.875rem 2.5rem', 
                  borderRadius: '10px', 
                  background: 'var(--input-bg)', 
                  border: '1px solid var(--border)', 
                  color: 'var(--input-color)',
                  transition: 'var(--transition)'
                }} 
              />
            </div>
            {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{(errors.email as any).message}</span>}
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type={showPassword ? "text" : "password"}
                {...register('password')}
                placeholder="••••••••"
                style={{ 
                  width: '100%', 
                  padding: '0.875rem 3rem 0.875rem 2.5rem', 
                  borderRadius: '10px', 
                  background: 'var(--input-bg)', 
                  border: '1px solid var(--border)', 
                  color: 'var(--input-color)',
                  transition: 'var(--transition)'
                }} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ 
                  position: 'absolute', 
                  right: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  background: 'none', 
                  padding: '0', 
                  color: 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'block' }}>{(errors.password as any).message}</span>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={isSubmitting} 
              style={{ 
                padding: '1rem', 
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                width: '100%'
              }}
            >
              {isSubmitting ? 'Verifying...' : 'Sign In Now'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              <span>OR</span>
              <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
            </div>

            <button 
              type="button"
              onClick={handleGuestLogin}
              className="btn-secondary" 
              disabled={isSubmitting} 
              style={{ 
                padding: '1rem', 
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                width: '100%',
                background: 'rgba(99, 102, 241, 0.05)',
                border: '1px solid var(--primary)',
                color: 'var(--primary)',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <LogIn size={18} /> Continue as Guest (Read-only)
            </button>
          </div>
        </form>

        {/* Portfolio Demo Message */}
        <div style={{ 
          marginTop: '2rem', 
          padding: '1.25rem', 
          background: 'rgba(99, 102, 241, 0.05)', 
          borderRadius: '12px', 
          border: '1px solid rgba(99, 102, 241, 0.2)',
          display: 'flex',
          gap: '1rem'
        }}>
          <div style={{ color: 'var(--primary)', marginTop: '0.2rem' }}>
            <Info size={18} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <p style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '0.25rem', color: 'var(--text-main)' }}>Portfolio Showcase Mode</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
              Guest mode allows you to explore all features without affecting the database. Perfect for recruiters and clients.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Create one</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
