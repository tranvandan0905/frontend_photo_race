import axios from '../services/axios';
export const GetTopranking  = async () => {
  const response = await axios.get(`/topranking/toprank`)
  return   response;
};
