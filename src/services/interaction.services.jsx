import {userAxios} from '../services/axios';
export const PostVoteTopic  = async () => {
  const response = await userAxios.post(`/votetopics`)
  return response;
};
export const PostLike   = async (submission_id) => {
  const response = await userAxios.post(`/likes`,{submission_id})
  return response;
};
export const DeleteLike   = async (submission_id) => {
  const response = await userAxios.delete(`/likes/${submission_id}`)
  return response;
};
export const PostVoteSubmission   = async (submission_id) => {
  const response = await userAxios.post(`/votesubmissions`,{submission_id})
  return response;
};
export const DeleteVoteSubmission    = async (submission_id) => {
  const response = await userAxios.delete(`/votesubmissions/${submission_id}`)
  return response;
};
export const findVoteSub    = async (submission_id) => {
  const response = await userAxios.get(`/votesubmissions/check/${submission_id}`)
  return response;
};
export const findLike    = async (submission_id) => {
  const response = await userAxios.get(`/likes/check/${submission_id}`)
  return response;
};
export const sumvoteSub    = async (topic_id) => {
  const response = await userAxios.get(`/sumvoteSub/${topic_id}`)
  return response;
};
export const sumvotetopic    = async (topic_id) => {
  const response = await userAxios.get(`/sumvotetopic/${topic_id}`)
  return response;
};