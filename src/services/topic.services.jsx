import {userAxios} from '../services/axios';
export const GetTopic  = async () => {
  const response = await userAxios.get(`/topic`)
  return   response;
};
export const FindTopic  = async (title) => {
  const response = await userAxios.get(`/topic/find`,{
      params:{title} 
    });
  return   response.data;
};
export const createtopic  = async (data) => {
  const response = await userAxios.post(`/topic`,data)
  return   response.data;
};
export const updatetopic  = async (id,data) => {
  const response = await userAxios.put(`/topic/${id}`,data)
  return   response.data;
};