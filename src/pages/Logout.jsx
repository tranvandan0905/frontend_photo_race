import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Xử lý logout
    localStorage.removeItem('token');
    navigate('/');
  }, [navigate]);

  return null; 
};

export default Logout;