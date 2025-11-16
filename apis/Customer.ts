import { apiClient } from '@/lib/apiClient';
import { ISignUpFormProps, IVerifyOtpProps } from '@/types/Customer';

export class CustomerApis {
  static async loginUser(email: string, password: string) {
    const response = await apiClient.post('/customer/login', {
      email,
      password,
    });
    return response.data;
  }
  static async registerUser(formData: ISignUpFormProps) {
    const response = await apiClient.post('/customer/register', formData);
    return response.data;
  }
  static async verifyOtp(data: IVerifyOtpProps) {
    const response = await apiClient.post('/customer/verify-otp', data);
    return response.data;
  }
  static async logout() {
    const response = await apiClient.get('/customer/logout');
    return response.data;
  }
  static async getSession() {
    const response = await apiClient.get('/customer/session');
    return response.data;
  }
  static async getOrders() {
    const response = await apiClient.get('/customer/orders');
    return response.data;
  }
}
