import axios from '../services/axios';
export const getAllUser = async (id) => {
    const response = await axios.get(`/user/findID`, {
        params: id ? { id } : {},});
    return response;
  };
  export const getFindNameUser = async (name) => {
    const response = await axios.get(`/user/find/name`, {
      params: { name } 
    });
    return response.data;
  }
