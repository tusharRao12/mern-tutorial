import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleChange = (e) =>{
        const { name, value} = e.target;
        console.log(name,value);
        const copySignUpInfo = {...signupInfo};
        copySignUpInfo[name] = value;
        setSignupInfo(copySignUpInfo);
    }
    const handleSignUp = (e)=>{
        e.preventDefault();
        const {name,email,password} = signupInfo;
        if(!name || !email || !password){
            
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