import { create } from 'zustand';

interface UserRegistrationState {
  email: string | null;
  nickname: string | null;
  setEmail: (email: string | null) => void;
  setNickname: (nickname: string | null) => void;
  clearUserRegistrationInfo: () => void;
}

const useUserRegistrationStore = create<UserRegistrationState>((set) => ({
  email: null,
  nickname: null,
  setEmail: (email: string | null) => {
    set({ email });
  },
  setNickname: (nickname: string | null) => {
    set({ nickname });
  },
  clearUserRegistrationInfo: () => {
    set({ email: null, nickname: null });
  },
}));

export default useUserRegistrationStore;
