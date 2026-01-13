import { User } from '@/types/user';
import { create } from 'zustand';
import { registerUser } from '@/app/(auth routes)/sign-up/auth';
import axios from 'axios';
// import { error } from 'node:console';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;

  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;

  setUser: (user: User) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),

  register: async (data) => {
    try {
      const response = await registerUser(data);
      //предполагаю, что БЭК возвращает user
      set({
        user: response.data.user,
        isAuthenticated: true,
      });
    } catch (error) {
      let message = 'Щось пішло не так. Спробуйте пізніше.';

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message ?? message;
      }

      throw new Error(message);
    }
  },
}));
