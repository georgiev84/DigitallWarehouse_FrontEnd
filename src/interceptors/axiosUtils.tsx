import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7054', // Optional: Set the base URL for all requests
});

instance.interceptors.request.use(config => {
    console.log("axios "+config)
  // Add your token here
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;