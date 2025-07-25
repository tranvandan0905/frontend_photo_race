import { userAxios } from "./axios";

export const getPostDepositRequestCountByDateRange  = async (data) => {

  const res = await userAxios.post(`/deposit-count-by-date`,data);
    return res;
    
}
export const getPostWithdrawRequestCountByDateRange  = async (data) => {

  const res = await userAxios.post(`/withdraw-count-by-date`,data);
    return res;
    
}
export const getPostUserCountByDateRange  = async (data) => {

  const res = await userAxios.post(`/user-count-by-date`,data);
    return res;
    
}
export const getPostCountByDateRange  = async (data) => {

  const res = await userAxios.post(`/sub-count-by-date`,data);
    return res;
    
}