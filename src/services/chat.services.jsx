import {chatAxios} from '../services/axios';
import { io } from "socket.io-client";
export const getconversation  = async () => {
  const response = await chatAxios.get(`http://localhost:3012/api/chat/conversation`);
  return   response;
};
export const getmessages  = async (conversationId) => {
    const res = await chatAxios.get(`http://localhost:3012/api/chat/messages/${conversationId}`);
      
  return   res;
};
export const postmessages  = async (data) => {
    const res = await chatAxios.post(`http://localhost:3012/api/chat/messages`,data);
      
  return   res;
};
// socket.js

let socket;

export const connectSocket = (token) => {
  socket = io("http://localhost:3012", {
    auth: { token },
    transports: ["websocket"],
  });

  return socket;
};
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
export const getSocket = () => socket;
