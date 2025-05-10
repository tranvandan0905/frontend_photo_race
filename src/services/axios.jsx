import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response) {
      console.error(" Axios error:", error.response.data);
    } else if (error.request) {
      console.error(" No response received:", error.request);
    } else {
      console.error(" Request setup error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
