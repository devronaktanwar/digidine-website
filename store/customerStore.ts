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
    set({ session: res });
  },
}));
interface OrderState {}

export const useOrders = create<OrderState>((set) => ({
  orders: [],
  fetchOrders: async () => {
    const res = await CustomerApis.getOrders();
    set({ orders: res.data });
  },
}));
