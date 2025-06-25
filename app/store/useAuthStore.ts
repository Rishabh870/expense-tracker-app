import { create } from 'zustand';
import { PUBLIC_REQUEST } from '../utils/requestMethods';
import { storeTokens } from '../utils/tokenManager';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  accessToken: string;
};

type AuthState = {
  user: User | null;
  hasHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loadUserFromStorage: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hasHydrated: false,
  login: async (email, password) => {
    try {
      const res = await PUBLIC_REQUEST.post('/auth/login', {
        identifier: email,
        password,
      });

      const accessToken = res.data.accessToken;
      const refreshToken = res.data.accessToken;

      storeTokens(accessToken, refreshToken);

      set({ user: { accessToken } });
      console.log('Logged In');
    } catch (error) {
      console.log(error);
    }
  },

  signup: async (username, email, password) => {
    // Simulated signup logic (replace with API later)
    try {
      console.log();

      await PUBLIC_REQUEST.post('/auth/register', {
        username,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  },

  logout: () => {
    set({ user: null });
    console.log('👋 Logged out');
  },

  loadUserFromStorage: async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      set({ user: { accessToken } });
    }
    set({ hasHydrated: true });
  },
}));
