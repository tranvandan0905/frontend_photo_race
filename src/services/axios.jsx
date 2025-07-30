import axios from "axios";

//  Hàm xử lý lỗi chung cho cả hai instance
const handleResponseError = (error) => {
  if (error.response) {
    console.error(" API error:", error.response.data.message || error.response.data);
  } else if (error.request) {
    console.error(" No response received:", error.request);
  } else {
    console.error(" Request setup error:", error.message);
  }
  return Promise.reject(error);
};

//  Instance cho advertiser
export const advertiserAxios = axios.create({
  baseURL: "http://localhost:3001/api",
});

advertiserAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("advertiser_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

advertiserAxios.interceptors.response.use(
  (response) => response.data,
  handleResponseError
);

// Instance cho user
export const userAxios = axios.create({
  baseURL: "http://localhost:3001/api",
});

userAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

userAxios.interceptors.response.use(
  (response) => response.data,
  handleResponseError
);

// Instance cho chat
export const chatAxios = axios.create({
  baseURL: "http://localhost:3012/api/chat",
});

chatAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

chatAxios.interceptors.response.use(
  (response) => response.data,
  handleResponseError
);
