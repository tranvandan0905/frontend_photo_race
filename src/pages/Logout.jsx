import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { disconnectSocket } from '../services/chat.services';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {

    localStorage.removeItem('token');
    disconnectSocket();

    navigate('/');
  }, [navigate]);

  return null;
};

export default Logout;