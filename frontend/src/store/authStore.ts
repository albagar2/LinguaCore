import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  level: string;
  xp: number;
  streak: number;
  achievements?: string[];
}

interface AuthState {
  user: User | null;
  token: string | null;
  isGuest: boolean;
  setAuth: (user: User, token: string, isGuest?: boolean) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isGuest: localStorage.getItem('isGuest') === 'true',
  setAuth: (user, token, isGuest = false) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    localStorage.setItem('isGuest', isGuest.toString());
    set({ user, token, isGuest });
  },
  updateUser: (updates) => {
    set((state) => {
      const newUser = state.user ? { ...state.user, ...updates } : null;
      if (newUser) localStorage.setItem('user', JSON.stringify(newUser));
      return { user: newUser };
    });
  },
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('isGuest');
    set({ user: null, token: null, isGuest: false });
  },
}));
