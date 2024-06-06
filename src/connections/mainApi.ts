import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';

const serverBaseURL = "http://192.168.0.75:3000/";
const production = "http://192.168.0.75:3000/"

export const url = production;

const axiosInstance = axios.create({
  baseURL: url,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { jwt } = useAuthStore.getState();
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { clearAuth } = useAuthStore.getState();
    if (error.response && error.response.status === 401) {
      clearAuth();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
