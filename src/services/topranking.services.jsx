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
// Gửi 3 tham số như query string
export const topranking = async (ranklike, rankcommnet, rankvote) => {
  const response = await userAxios.get(`/topranking`, {
    params: {
      ranklike,
      rankcommnet,
      rankvote
    }
  });

  return response;
};
