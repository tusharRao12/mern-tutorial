import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RefreshHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      if (['/', '/login', '/signup'].includes(location.pathname)) {
        navigate('/home', { replace: true });
      }
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return null;
};

export default RefreshHandler;
