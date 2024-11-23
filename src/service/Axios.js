import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const token = AsyncStorage.getItem('expens');

const instance = axios.create({
  baseURL: 'http://192.168.43.162:3000',
    timeout: 1000,
    headers: {Authorization: `Bearer ${token}`}
  });
  export default instance;