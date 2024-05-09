import { create } from 'zustand';

interface AuthStoreState {
  isLoggedIn: boolean;
  isAdminUser: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
  setIsAdminUser: (isAdminUser: boolean) => void;
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
  setIsAdminUser: (isAdminUser: boolean) => {
    set(() => ({ isAdminUser: isAdminUser }));
  },
}));

export default useAuthStore;
