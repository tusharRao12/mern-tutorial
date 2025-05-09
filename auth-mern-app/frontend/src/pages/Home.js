import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSuccess } from './utils';
import { ToastContainer } from 'react-toastify';
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('')

  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[])

  const handleLogout = (e) =>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out')
    setTimeout(()=>{
      navigate('/login')
    },1000)
  }
  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer/>
    </div>
  )
}

export default Home;