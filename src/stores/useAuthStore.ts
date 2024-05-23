import create from 'zustand';

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
  isVerified: boolean;
  name: string;
  password: string;
}

interface AuthState {
  jwt: string;
  user: User | null;
  setAuth: (jwt: string, user: User) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  jwt: '',
  user: null,
  setAuth: (jwt: string, user: User) => set({ jwt, user }),
  clearAuth: () => set({ jwt: '', user: null }),
}));

export default useAuthStore;
