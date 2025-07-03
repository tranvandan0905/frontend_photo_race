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