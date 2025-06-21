import { create } from 'zustand';
import { PUBLIC_REQUEST } from '../utils/requestMethods';

type User = {
  jwt: string;
};

type AuthState = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (email, password) => {
    try {
      const res = await PUBLIC_REQUEST.post('/auth/login', {
        email,
        password,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  signup: async (username, email, password) => {
    // Simulated signup logic (replace with API later)
    try {
      console.log();
      
      const res = await PUBLIC_REQUEST.post('/auth/signup', {
        username,
        email,
        password,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  },

  logout: () => {
    set({ user: null });
    console.log('👋 Logged out');
  },
}));
