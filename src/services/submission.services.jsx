import { userAxios } from '../services/axios';
export const getAllPost = async (user) => {
  const user_id = user.user_id;
  const response = await userAxios.get(`/submission`, {
    params: user_id ? { user_id } : {},
  });
  return response;
};
export const PostSub = async (data) => {
  const response = await userAxios.post(`/submission`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
export const deleteSub = async (id) => {
  const response = await userAxios.delete(`/submission/${id}`);
  return response;
};