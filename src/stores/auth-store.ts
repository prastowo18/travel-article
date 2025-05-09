import { create } from 'zustand';
import { validateToken } from '@/services/validateToken';

interface AuthState {
  id: string | null;
  username: string | null;
  email: string | null;
  isAuthenticated: boolean | null;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null,
  id: '',
  username: '',
  email: '',

  checkAuth: async () => {
    try {
      const result = await validateToken();
      set({
        isAuthenticated: result.is_authenticated,
        id: result.id,
        username: result.username,
        email: result.email,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error('Auth check failed:', error);
      set({ isAuthenticated: false, id: '', username: '', email: '' });
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ isAuthenticated: false, id: '', username: '', email: '' });
  },
}));
