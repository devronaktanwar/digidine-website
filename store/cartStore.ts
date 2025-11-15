import { create } from 'zustand';
import { CartApis } from '@/apis/Cart';
import { IAddon } from '@/components/menu/Addons';

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
  fetchCart: (val: string) => Promise<void>;
  updateCart: (
    menu_item_id: string,
    quantity: number,
    business_id: string,
    addons: string[]
  ) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,

  fetchCart: async (business_id: string) => {
    if (!business_id) return;
    const res = await CartApis.getCart(business_id);
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
