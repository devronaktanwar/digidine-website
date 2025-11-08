import { create } from 'zustand';
import { CustomerApis } from '@/apis/Customer';

interface SessionState {
  session: {
    isLoggedIn: boolean;
    data?: any;
  };
  fetchSession: () => Promise<void>;
}

export const useSessionStore = create<SessionState>((set) => ({
  session: {
    isLoggedIn: false,
  },
  fetchSession: async () => {
    const res = await CustomerApis.getSession();
    console.log({ res });
    set({ session: res });
  },
}));
