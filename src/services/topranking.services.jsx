import axios from '../services/axios';
export const GetTopranking  = async () => {
  const response = await axios.get(`/topranking/toprank`)
  return   response;
};
export const FindTopic_sub  = async (topic_id) => {
  const response = await axios.get(`/topranking-topic/${topic_id}`)
  return   response;
};
