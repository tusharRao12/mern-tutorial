import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils/utils';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) return handleError('Email and password are required.');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo)
      });

      const { success, message, jwtToken, name, error } = await response.json();

      if (success) {
        login(jwtToken, name);
        handleSuccess(message);
        setTimeout(() => navigate('/home'), 1000);
      } else {
        handleError(error?.details?.[0]?.message || message);
      }
    } catch (err) {
      handleError('Login failed. Try again.');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} value={loginInfo.email} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} value={loginInfo.password} />
        <button type="submit">Login</button>
        <span>Don't have an account? <Link to="/signup">Signup</Link></span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
