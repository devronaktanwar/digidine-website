import { create } from 'zustand';
import { CartApis } from '@/apis/Cart';

interface ICartItem {
  menu_item_id: string;
  label: string;
  description: string;
  original_price: number;
  selling_price: number;
  image: string;
  quantity: number;
  addons: string[];
}

interface CartState {
  cart: {
    cart_id?: string;
    items: ICartItem[];
    total_amount: number;
    business_id: string;
  } | null;
  fetchCart: ({
    cart_id,
    business_id,
  }: {
    cart_id?: string;
    business_id?: string;
  }) => Promise<void>;
  updateCart: (
    menu_item_id: string,
    quantity: number,
    business_id: string,
    addons: string[]
  ) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,

  fetchCart: async ({
    cart_id,
    business_id,
  }: {
    business_id?: string;
    cart_id?: string;
  }) => {
    // if (!business_id) return;
    const res = await CartApis.getCart({ business_id, cart_id });
    set({ cart: res.data });
  },

  updateCart: async (menu_item_id, quantity, business_id, addons) => {
    const res = await CartApis.addToCart({
      business_id,
      menu_item_id,
      quantity,
      addons,
    });
    // set({ cart: res.data });
  },
}));
