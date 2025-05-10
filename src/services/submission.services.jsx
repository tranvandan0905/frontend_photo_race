import axios from '../services/axios';
export const getAllPost = async (user) => {
const user_id=user.user_id;
  const response = await axios.get(`/submission`, {
    params: user_id ? { user_id } : {},});
  return response;
};
export const PostSub = async (data) => {
  const response = await axios.post(`/submission`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
