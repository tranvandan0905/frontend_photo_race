import { userAxios } from '../services/axios';
export const getAllUser = async (id) => {
  const response = await userAxios.get(`/user/findID`, {
    params: id ? { id } : {},
  });
  return response;
};
export const getUser = async (check) => {
  const response = await userAxios.get(`/user`, {
    params: check ? { check } : {},
  });
  return response;
};
export const getFindNameUser = async (name) => {
  const response = await userAxios.get(`/user/find/name`, {
    params: { name }
  });
  return response;
}
export const Updateavatar = async (formData) => {
  const response = await userAxios.put(`/user/Avata`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const Updateuser = async (data) => {
  const response = await userAxios.put(`/user`, data);
  return response;
};

export const deleteUser = async () => {
  const response = await userAxios.delete(`/user`);
  return response;
};
export const verifypassword = async (token, pasword, email) => {
  const response = await userAxios.post(`/verify-password`, { token, pasword, email });
  return response;
};
export const emailpassword = async (email) => {
  const response = await userAxios.post(`/email-password`, { email });
  return response;
};
export const postfriendship = async (id) => {
  const response = await userAxios.get(`/friendship/${id}`);
  return response;
};
export const getfriendship = async (check) => {
  const response = await userAxios.get(`/friendship/find/${check}`);
  return response;
};
export const updatefriendship = async (id,data) => {
  const response = await userAxios.put(`/friendship/${id}`,data);
  return response;
};