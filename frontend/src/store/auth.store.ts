import { create } from 'zustand';

interface AuthStoreState {
  isLoggedIn: boolean;
  isAdminUser: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

const useAuthStore = create<AuthStoreState>((set) => ({
  isLoggedIn: false,
  isAdminUser: false,
  storeLogin: (token: string) => {
    if (token) {
      set(() => ({ isLoggedIn: true }));
    }
  },
  storeLogout: () => {
    set(() => ({ isLoggedIn: false }));
  },
}));

export default useAuthStore;
