import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils/utils';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      const result = await response.json();
      setProducts(result);
    } catch (err) {
      handleError('Failed to load products');
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLogout = () => {
    logout();
    handleSuccess('Logged out');
    setTimeout(() => navigate('/login'), 1000);
  };

  return (
    <div>
      <h1>Welcome, {user}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
      <ul>
        {products.map((item, idx) => (
          <li key={idx}>{item.name}: {item.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
