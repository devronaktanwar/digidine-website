import { IAddon } from '@/components/menu/Addons';
import { apiClient } from '@/lib/apiClient';

export const CartApis = {
  addToCart: async ({
    business_id,
    menuItemId,
    quantity,
    addons,
  }: {
    business_id: string;
    menuItemId: string;
    quantity: number;
    addons: string[];
  }) => {
    return apiClient.post(`/cart/add`, {
      business_id,
      menuItemId,
      quantity,
      addons,
    });
  },

  getCart: async (businessId: string) => {
    return apiClient.get(`/cart/${businessId}`);
  },

  removeItem: async (cartId: string, menuItemId: string) => {
    return apiClient.delete(`$/cart/${cartId}/item/${menuItemId}`);
  },
};
