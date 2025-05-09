import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from './utils';
const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name:'',
        email:'',
        password:''
    });

    const navigate = useNavigate();

    const handleChange = (e) =>{
        const { name, value} = e.target;
        console.log(name,value);
        const copySignUpInfo = {...signupInfo};
        copySignUpInfo[name] = value;
        setSignupInfo(copySignUpInfo);
    }
    const handleSignUp = async (e)=>{
        e.preventDefault();
        const {name,email,password} = signupInfo;
        if(!name || !email || !password){
            return handleError('name, email and password are required');
        }
        try{
            const url = "http://localhost:8080/auth/signup";
            const response = await fetch(url,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(signupInfo)
            });
            const result = await response.json();
            const { success, message, error } = result;
            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        }catch(err) {

        }
    }
  return (
    <div className="container">
        <h1>Signup</h1>
        <form onSubmit={handleSignUp}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" autoFocus placeholder='Enter your Name' onChange={handleChange} value={signupInfo.name}/>
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder='Enter your Email' onChange={handleChange} value = {signupInfo.email}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" placeholder='Enter your password' onChange={handleChange} value = {signupInfo.password}/>
            </div>
            <button type="submit">Signup</button>
            <span>Already have an account ? 
                <Link to ='/login'>Login</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Signup;