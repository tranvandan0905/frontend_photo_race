import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutAds = () => {
  const navigate = useNavigate();
  navigate('/');
  useEffect(() => {
    localStorage.removeItem('advertiser_token');
    navigate('/');
  }, [navigate]);

  return null;
};

export default LogoutAds;