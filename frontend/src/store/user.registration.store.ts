import { create } from 'zustand';

interface UserRegistrationState {
  storeEmail: string | null;
  storeNickname: string | null;
  setStoreEmail: (email: string | null) => void;
  setStoreNickname: (nickname: string | null) => void;
  clearUserRegistrationInfo: () => void;
}

const useUserRegistrationStore = create<UserRegistrationState>((set) => ({
  storeEmail: null,
  storeNickname: null,
  setStoreEmail: (email: string | null) => {
    set({ storeEmail: email });
  },
  setStoreNickname: (nickname: string | null) => {
    set({ storeNickname: nickname });
  },
  clearUserRegistrationInfo: () => {
    set({ storeEmail: null, storeNickname: null });
  },
}));

export default useUserRegistrationStore;
