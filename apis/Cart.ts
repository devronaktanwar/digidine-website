import { IAddon } from '@/components/menu/Addons';
import { apiClient } from '@/lib/apiClient';

export const CartApis = {
  addToCart: async ({
    business_id,
    menu_item_id,
    quantity,
    addons,
  }: {
    business_id: string;
    menu_item_id: string;
    quantity: number;
    addons: string[];
  }) => {
    return apiClient.post(`/customer/cart/add`, {
      business_id,
      menu_item_id,
      quantity,
      addons,
    });
  },

  getCart: async (business_id: string) => {
    return apiClient.get(`/customer/cart/${business_id}`);
  },

  removeItem: async (cart_id: string, menu_item_id: string) => {
    return apiClient.delete(`$/cart/${cart_id}/item/${menu_item_id}`);
  },

  placeOrder: async (cart_id: string) => {
    return apiClient.post('/customer/place-order', { cart_id });
  },
};
