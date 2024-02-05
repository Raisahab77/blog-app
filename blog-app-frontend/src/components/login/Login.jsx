import React from 'react'
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from "../../userContext";


const Login = () => {
  const {setIsAuthenticated} = useContext(userContext);
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

  async function login(e){
    e.preventDefault();
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
          }
      })
  }


  if(redirect || localStorage.getItem('isLoggedIn')=='true'){
    return <Navigate to={'/'} />
  }
  return (
    <div className='w-full mt-24 flex justify-center items-center'>
        <form 
            className='md:w-[40%] sm:w-[60%] w-[80%] flex flex-col gap-5'
            onSubmit={login}>
            <input
              className='w-full py-3.5 px-5 rounded-md bg-[#2929293c] outline-2 outline-[#FF69B4] placeholder:text-black text-black'
              placeholder='Username'
              type="text"
              value={userName}
              onChange={ev => setUserName(ev.target.value)} />
            <input
              className='w-full py-3.5 px-5 rounded-md bg-[#2929293c] outline-2 outline-[#FF69B4] placeholder:text-black text-black'
              placeholder='Password'
              type="text"
              value={password}
              onChange={ev => setPassword(ev.target.value)} />
            <input
              className='w-full py-3.5 px-5 rounded-md bg-[#FF69B4] text-white cursor-pointer'
              type="submit"
              value="Login"/>
        </form>
    </div>
  )
}

export default Login
