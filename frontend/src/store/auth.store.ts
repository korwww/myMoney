import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface AuthStoreState {
  isLoggedIn: boolean;
  isAdminUser: boolean;
  storeLogin: () => void;
  storeLogout: () => void;
  setIsAdminUser: (isAdminUser: boolean) => void;
}

const useAuthStore = create<AuthStoreState>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        isAdminUser: false,
        storeLogin: () => {
          set(() => ({ isLoggedIn: true }));
        },
        storeLogout: () => {
          set(() => ({ isLoggedIn: false }));
        },
        setIsAdminUser: (isAdminUser: boolean) => {
          set(() => ({ isAdminUser: isAdminUser }));
        },
      }),
      {
        name: 'myMoney-Store',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export default useAuthStore;
