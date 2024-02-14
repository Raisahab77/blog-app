import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from "../../userContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const Login = () => {
  const {setIsAuthenticated} = useContext(userContext);
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const [showPassword,setShowPassword] = useState(false);

  async function login(e){
    e.preventDefault();
    if(userName !=="" && password !==""){
      let response = fetch('http://localhost:5000/user/login',{
      method:'Post',
      body:JSON.stringify({userName,password}),
      headers:{'Content-type':'application/json'},
      credentials:'include'
    });

    response.then(res =>
      res.json()).then(data => {
          console.log(data)
          if(data.statusCode==200){
            setRedirect(true);
            localStorage.setItem('isLoggedIn','true');
            setIsAuthenticated(true);
          }else if(data.statusCode==404){
            toast.error("User not found", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
          }else if(data.statusCode==400){
            toast.error("Incorrect user and password", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
          }else{
            toast.error("Try again later", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
            });
          }
    })
    }
  }


  if(redirect || localStorage.getItem('isLoggedIn')=='true'){
    return <Navigate to={'/'} />
  }
  return (
      <div className='w-full'>
        <div className='w-full flex justify-center items-center'>
          <form 
              className='md:w-[40%] sm:w-[60%] w-[80%] flex flex-col gap-5'
              onSubmit={login}>
              <input
                className='w-full py-3.5 px-5 rounded-md bg-[#2929293c] outline-2 outline-[#FF69B4] placeholder:text-black text-black'
                placeholder='Username'
                type="text"
                value={userName}
                onChange={ev => setUserName(ev.target.value)} />

              <div className='relative flex items-center'>
                  <input
                    className='w-full py-3.5 px-5 rounded-md bg-[#2929293c] outline-2 outline-[#FF69B4] placeholder:text-black text-black'
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={ev => setPassword(ev.target.value)} />
                    
                    {
                      showPassword &&
                      (
                        <FontAwesomeIcon className='absolute right-4' onClick={() =>
                        setShowPassword((prev) => !prev)} icon={faEyeSlash} />
                      )
                      
                    }
                    {
                      !showPassword &&
                      (
                        <FontAwesomeIcon className='absolute right-4' onClick={() =>
                          setShowPassword((prev) => !prev)} icon={faEye} />
                      )

                    }
              </div>
              <input
                className='w-full py-3.5 px-5 rounded-md bg-[#FF69B4] text-white cursor-pointer'
                type="submit"
                value="Login"/>
          </form>
        </div>
      </div>
  )
}

export default Login
