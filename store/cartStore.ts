import { create } from 'zustand';
import { CartApis } from '@/apis/Cart';

interface ICartItem {
  menuItemId: string;
  label: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: {
    _id?: string;
    items: ICartItem[];
    totalAmount: number;
  } | null;
  fetchCart: (val: string) => Promise<void>;
  updateCart: (
    menuItemId: string,
    quantity: number,
    business_id: string
  ) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,

  fetchCart: async (businessId: string) => {
    if (!businessId) return;
    const res = await CartApis.getCart(businessId);
    set({ cart: res.data });
  },

  updateCart: async (menuItemId, quantity, business_id) => {
    const res = await CartApis.addToCart({
      business_id,
      menuItemId,
      quantity,
    });
    set({ cart: res.data });
  },
}));
