import { apiClient } from '@/lib/apiClient';

export class MenuApis {
  static async getMenuItems({ business_id }: { business_id: string }) {
    const response = await apiClient.get(`/menu/${business_id}`);
    return response.data;
  }
}
