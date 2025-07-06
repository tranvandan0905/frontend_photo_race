
import {userAxios} from '../services/axios';
export const postDepositRequest = async (depositAmount) => {
    const response = await userAxios.post(`/banking`,  { xu: depositAmount });
  return response;
};
export const getDepositRequest = async () => {
    const response = await userAxios.get(`/depositrequest`);
  return response;
};
export const getWithdrawrequest = async () => {
    const response = await userAxios.get(`/withdrawrequest`);
  return response;
};
export const postWithdrawRequest = async (depositAmount) => {
    const response = await userAxios.post(`/banking`,  { xu: depositAmount });
  return response;
};