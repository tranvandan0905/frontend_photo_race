
import {userAxios} from '../services/axios';
export const postDepositRequest = async (xu) => {
 
    const response = await userAxios.post(`/banking`,  { xu: xu.xu });
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
export const postWithdrawRequest = async (totalScore, password) => {
    const response = await userAxios.post(`/withdrawrequest`,{totalScore, password});
  return response;
};
export const bankAcc = async (data) => {
    const response = await userAxios.post(`/bankAcc`,data);
  return response;
};
export const findbankAcc = async () => {
    const response = await userAxios.get(`/bankAcc`);
  return response;
};
export const findbankAccadmin = async (id) => {

    const response = await userAxios.get(`/bankAccuser/${id}`);
      console.log(id);
  return response;
};
export const GetALLDepositRequest = async () => {
    const response = await userAxios.get(`/alldepositrequest`);
  return response;
};
export const GetALLWithdrawRequest = async () => {
    const response = await userAxios.get(`/allwithdrawrequest`);
  return response;
};
export const updatewithdrawRequet = async (id,newStatus) => {
    const response = await userAxios.put(`/update-status/${id}`,{newStatus});
  return response;
};