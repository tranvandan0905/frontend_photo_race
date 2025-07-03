import {userAxios} from '../services/axios';
export const GetTopic  = async () => {
  const response = await userAxios.get(`/topic`)
  return   response.data?.data;
};
export const FindTopic  = async (title) => {
  const response = await userAxios.get(`/topic/find`,{
      params:{title} 
    });
  return   response.data?.data;
};