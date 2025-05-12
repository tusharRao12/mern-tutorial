import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import RefreshHandler from './components/RefreshHandler';

function App() {
  return (
    <AuthProvider>
      <RefreshHandler />
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={<PrivateRoute><Home /></PrivateRoute>}
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
