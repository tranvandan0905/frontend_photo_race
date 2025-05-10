
import axios from '../services/axios';
export const getAllComment = async (submission_id) => {
    const response = await axios.get(`/submissions/${submission_id}/comments`);
  return response;
};
