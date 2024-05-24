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
  jwt: string | null;
  user: User | null;
  setAuth: (jwt: string, user: User) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  jwt: localStorage.getItem('jwt') || null,
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  setAuth: (jwt: string, user: User) => {
    localStorage.setItem('jwt', jwt);
    localStorage.setItem('user', JSON.stringify(user));
    set({ jwt, user });
  },
  clearAuth: () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    set({ jwt: null, user: null });
  },
}));

export default useAuthStore;
