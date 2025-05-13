import axios from '../services/axios';
export const GetTopic  = async () => {
  const response = await axios.get(`/topic`)
  return   response.data?.data;
};
