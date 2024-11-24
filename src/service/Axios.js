import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const instance = axios.create({
  baseURL: 'http://192.168.43.162:3000',
  timeout: 2000,
});

// Interceptor to add the token dynamically
instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('expens');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
