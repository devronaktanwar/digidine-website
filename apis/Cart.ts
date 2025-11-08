import { apiClient } from '@/lib/apiClient';

export const CartApis = {
  addToCart: async ({
    business_id,
    menuItemId,
    quantity,
  }: {
    business_id: string;
    menuItemId: string;
    quantity: number;
  }) => {
    return apiClient.post(`/cart/add`, {
      business_id,
      menuItemId,
      quantity,
    });
  },

  getCart: async (businessId: string) => {
    return apiClient.get(`/cart/${businessId}`);
  },

  removeItem: async (cartId: string, menuItemId: string) => {
    return apiClient.delete(`$/cart/${cartId}/item/${menuItemId}`);
  },

  // ✅ Place order (optional)
  // placeOrder: async (cartId: string, customerInfo: any) => {
  //   return axios.post(`${API_BASE}/order/create`, {
  //     cartId,
  //     customerInfo,
  //   });
  // },
};
