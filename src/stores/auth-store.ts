import { create } from 'zustand';
import { validateToken } from '@/services/validateToken';

interface AuthState {
  isAuthenticated: boolean | null;
  checkAuth: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: null,

  checkAuth: async () => {
    try {
      const result = await validateToken();
      set({ isAuthenticated: result });
    } catch (error) {
      console.error('Auth check failed:', error);
      set({ isAuthenticated: false });
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    set({ isAuthenticated: false });
  },
}));
