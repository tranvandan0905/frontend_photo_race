import axios from '../services/axios';
export const GetTopic  = async () => {
  const response = await axios.get(`/topic`)
  return   response.data?.data;
};
export const FindTopic  = async (title) => {
  const response = await axios.get(`/topic/find`,{
      params:{title} 
    });
  return   response.data?.data;
};