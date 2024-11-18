import axios from "axios";

// const token = localStorage.getItem('login');

const instance = axios.create({
  baseURL: 'http://192.168.43.162:3000',
    timeout: 5000,
    // headers: {Authorization: `Bearer ${token}`}
  });
  export default instance;