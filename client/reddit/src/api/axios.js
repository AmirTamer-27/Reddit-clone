import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/", // Put your backend URL
  withCredentials: true,            // important if backend uses cookies
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default api;
