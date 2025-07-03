import {userAxios,advertiserAxios} from '../services/axios';

export const Login = async (email, password) => {
  try {
    const response = await userAxios.post('/login', { email, password });
    localStorage.setItem('token', response.token);
    
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Đăng nhập thất bại!');
  }
};
export const register = async (email, name, password) => {
  try {
    const response = await userAxios.post('/register', { email, password,name });
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
