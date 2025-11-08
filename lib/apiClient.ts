import axios from 'axios';
export const apiClient = axios.create({
  //use with sameSite:lax in backend
  baseURL: '/api/v1',

  //use when want to use production api call --> api will call via proxy
  // baseURL: 'https://digidine-backend.vercel.app/api/v1',
  withCredentials: true,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// apiClient.interceptors.response.use((response) => response,
//   (error) => {
//     if(error?.response?.status===401){
//        window.location.href = '/login'
//     }
//     return Promise.reject(error);
//   })
