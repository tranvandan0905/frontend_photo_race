
import axios from '../services/axios';
export const getAllComment = async (submission_id) => {
    const response = await axios.get(`/submissions/${submission_id}/comments`);
  return response;
};
export const postcommnet = async (submission_id,content) => {
    const response = await axios.post(`/comments`,{submission_id,content});
  return response;
};