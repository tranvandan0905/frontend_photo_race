import {advertiserAxios} from '../services/axios';
export const createAd = async (data) => {
  const res = await advertiserAxios.post('/ads', data);
    return res.data;
    
}
export const GetActiveAds  = async () => {
  const res = await advertiserAxios.get('/ads/activeAds');
    return res.data;
    
}
export const GetAdsByAdvertiser  = async () => {
  const res = await advertiserAxios.get('/ads/byAdvertiser/');
    return res.data;
    
}
export const UpdateAds  = async (id,data) => {
  const res = await advertiserAxios.put(`/ads/update/${id}`,data);
    return res.data;
    
}
export const Updateadver  = async (data) => {
  const res = await advertiserAxios.put(`/ads/advertisers`,data);
    return res.data;
    
}
export const FindverID  = async () => {
  const res = await advertiserAxios.get(`/advertisersID`);
    return res.data;
    
}
