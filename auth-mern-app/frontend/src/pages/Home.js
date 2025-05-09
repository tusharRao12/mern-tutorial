import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from './utils';
import { ToastContainer } from 'react-toastify';
const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[])

  const fetchProducts = async()=>{
    try{
      const url = 'http://localhost:8080/products';
      const headers = {
        headers : {
          'Authorization': localStorage.getItem('token')
        }
      }
      const response = await fetch(url,headers);
      const result = await response.json();
      setProducts(result);
    }catch(err){
      handleError(err);
    }
  }
  useEffect(()=>{
    fetchProducts()
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
      <div>
        <ul>
          {products.map((item,index) => (
            <li key={index}>{item.name}: {item.price}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home;