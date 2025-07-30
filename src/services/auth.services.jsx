import { userAxios, advertiserAxios } from '../services/axios';
import { connectSocket } from './chat.services';

export const Login = async (email, password) => {
  try {
    const response = await userAxios.post('/login', { email, password });
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem("user_id", response.id);
      const socket = await connectSocket(response.token);
      socket.on("connection");
    }
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Đăng nhập thất bại!');
  }
};
export const register = async (email, name, password) => {
  try {
    const response = await userAxios.post('/register', { email, password, name });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Đăng ký thất bại!');
  }
};
export const LoginAds = async (email, password) => {
  try {
    const response = await advertiserAxios.post('/loginAds', { email, password });
    localStorage.setItem('advertiser_token', response.token);

    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Đăng nhập thất bại!');
  }
};
export const registerAds = async (data) => {
  try {
    const response = await advertiserAxios.post('/registerAds', data);
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Đăng ký thất bại!');
  }
};
