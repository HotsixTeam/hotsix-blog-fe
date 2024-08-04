import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://223.130.154.175:3000', // JSON Server가 동작 중인 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
