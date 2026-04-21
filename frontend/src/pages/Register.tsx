import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { User, Mail, Lock, UserPlus, Eye, EyeOff } from 'lucide-react';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await api.post('/auth/register', data);
      toast.success('Account created successfully!', {
        description: 'You can now sign in with your credentials.'
      });
      navigate('/login');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed. Try again.';
      toast.error(message);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '80vh',
      padding: '2rem 1rem',
      background: 'radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.05), transparent)',
    }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card" 
        style={{ width: '100%', maxWidth: '440px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '64px', height: '64px', background: 'var(--accent)', 
            borderRadius: '16px', display: 'flex', alignItems: 'center', 
            justifyContent: 'center', margin: '0 auto 1.5rem',
            boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)'
          }}>
            <UserPlus color="white" size={32} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>Join LinguaCore</h2>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Start your journey to native fluency today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                {...register('name')}
                placeholder="Enter your name"
                style={{ 
                  width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', 
                  borderRadius: '10px', background: 'var(--input-bg)', 
                  border: '1px solid var(--border)', color: 'var(--input-color)'
                }} 
              />
            </div>
            {errors.name && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{(errors.name as any).message}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                {...register('email')}
                placeholder="name@example.com"
                style={{ 
                  width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', 
                  borderRadius: '10px', background: 'var(--input-bg)', 
                  border: '1px solid var(--border)', color: 'var(--input-color)'
                }} 
              />
            </div>
            {errors.email && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{(errors.email as any).message}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type={showPassword ? "text" : "password"}
                {...register('password')}
                placeholder="Password (min. 8 characters)"
                style={{ 
                  width: '100%', padding: '0.8rem 3rem 0.8rem 2.5rem', 
                  borderRadius: '10px', background: 'var(--input-bg)', 
                  border: '1px solid var(--border)', color: 'var(--input-color)'
                }} 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--text-muted)' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{(errors.password as any).message}</span>}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type={showConfirmPassword ? "text" : "password"}
                {...register('confirmPassword')}
                placeholder="Retype your password"
                style={{ 
                  width: '100%', padding: '0.8rem 3rem 0.8rem 2.5rem', 
                  borderRadius: '10px', background: 'var(--input-bg)', 
                  border: '1px solid var(--border)', color: 'var(--input-color)'
                }} 
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', color: 'var(--text-muted)' }}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && <span style={{ color: 'var(--danger)', fontSize: '0.75rem', marginTop: '0.2rem', display: 'block' }}>{(errors.confirmPassword as any).message}</span>}
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting} 
            style={{ 
              marginTop: '1rem', background: 'linear-gradient(135deg, var(--accent) 0%, #059669 100%)',
              boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' 
            }}
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>Sign In</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
