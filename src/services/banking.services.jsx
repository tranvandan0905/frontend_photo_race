
import {userAxios} from '../services/axios';
export const postDepositRequest = async (depositAmount) => {
    const response = await userAxios.post(`/banking`,  { xu: depositAmount });
  return response;
};