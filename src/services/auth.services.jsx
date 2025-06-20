import axios from '../services/axios';

export const Login = async (email, password) => {
  try {
    const response = await axios.post('/login', { email, password });
    localStorage.setItem('token', response.token);
    
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Đăng nhập thất bại!');
  }
};
export const register = async (email, name, password) => {
  try {
    const response = await axios.post('/register', { email, password,name });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Đăng ký thất bại!');
  }
};

