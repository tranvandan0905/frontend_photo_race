import {userAxios} from '../services/axios';
export const GetTopranking  = async () => {
  const response = await userAxios.get(`/topranking/toprank`)
  return   response;
};
export const FindTopic_sub  = async (topic_id) => {
  const response = await userAxios.get(`/topranking-topic/${topic_id}`)
  return   response.data;
};
export const new_user_topranking = async () => {
  const response = await userAxios.get(`/topranking/new-user-topranking`)
  return   response;
};
export const findUserScore = async () => {
  const response = await userAxios.get(`/findUserScore`)
  return   response;
};