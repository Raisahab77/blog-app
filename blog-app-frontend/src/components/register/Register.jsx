import React from 'react'
import { useState } from 'react';

const Register = () => {
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');

  async function register(e){
    e.preventDefault();
    console.log("In registration");
    await fetch('http://localhost:5000/user/register',{
      method:'Post',
      body:JSON.stringify({userName,password}),
      headers:{'Content-type':'application/json'}
    })
  }
  
  return (
    <div className='w-full mt-24 flex justify-center items-center'>
        <form 
            className='md:w-[40%] sm:w-[60%] w-[80%] flex flex-col gap-5'
            onSubmit={register}>
              
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
              value="Registration"/>

        </form>
    </div>
  )

  function submit(){
    console.log()
  }
}

export default Register;
