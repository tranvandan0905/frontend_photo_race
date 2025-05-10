import axios from '../services/axios';
export const PostVoteTopic  = async () => {
  const response = await axios.post(`/votetopics`)
  return response;
};
export const PostLike   = async (submission_id) => {
  const response = await axios.post(`/likes`,{submission_id})
  return response;
};
export const DeleteLike   = async (submission_id) => {
  const response = await axios.delete(`/likes/${submission_id}`)
  return response;
};
