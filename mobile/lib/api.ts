import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_API_BASE_URL,
});

// add an interceptor to logout on 401
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // logout
//       // logout and redirect to login page
//       NavigationActions.navigate({ routeName: 'login' });
//     }
//     return Promise.reject(error);
//   }
// );
