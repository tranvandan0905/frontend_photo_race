import {advertiserAxios, userAxios} from '../services/axios';
export const createAd = async (data) => {
  const res = await advertiserAxios.post('/ads', data);
    return res;
    
}
export const getallAd = async () => {
  const res = await advertiserAxios.get('/ads');
    return res;
    
}
export const GetActiveAds  = async () => {
  const res = await advertiserAxios.get('/ads/activeAds');
    return res.data;
    
}
export const GetActiveAdsall = async () => {
  const res = await advertiserAxios.get('/advertisers');
    return res.data;
    
}
export const GetAdsByAdvertiser  = async () => {
  const res = await advertiserAxios.get('/ads/byAdvertiser/');
    return res.data;
    
}
export const UpdateAds  = async (id,data) => {
  const res = await advertiserAxios.put(`/ads/update/${id}`,data);
    return res;
    
}
export const adsadmin  = async (id,status) => {
  const res = await userAxios.put(`/adsadmin/update/${id}`,{status});
    return res;
    
}
export const Updateadver  = async (data) => {
  const res = await advertiserAxios.put(`/advertisers`,data);
    return res.data;
    
}
export const FindverID  = async () => {
  const res = await advertiserAxios.get(`/advertisersID`);
    return res.data;
    
}
export const GetPaymentADS  = async (id) => {
  const res = await advertiserAxios.get(`/adpayment/${id}`);
    return res.data;
    
}
export const GetAdsByAdvertiserAdmin  = async (id) => {
  const res = await userAxios.get(`/ads/byAdvertiser/${id}`);
    return res.data;
    
}
export const getAdpayment  = async () => {
  const res = await userAxios.get(`/adPaymentAdmin`);
    return res.data;
    
}