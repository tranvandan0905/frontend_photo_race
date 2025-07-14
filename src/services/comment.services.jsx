
import {userAxios} from '../services/axios';
export const getAllComment = async (submission_id) => {
    const response = await userAxios.get(`/submissions/${submission_id}/comments`);
  return response;
};
export const postcommnet = async (submission_id,content) => {
    const response = await userAxios.post(`/comments`,{submission_id,content});
  return response;
};
export const deletecommnet = async (id) => {
    const response = await userAxios.delete(`/comments/${id}`);
  return response;
};