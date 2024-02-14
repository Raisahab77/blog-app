import React from 'react'
import { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { Navigate,useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [userName,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const [showPassword,setShowPassword] = useState(false);
  const [length,setLength] = useState(false);
  const [upper,setUpper] = useState(false);
  const [lower,setLower] = useState(false);
  const [specialChar,setSpecialChar] = useState(false);
  const [number,setNumber] = useState(false);
  const [passTouched,setPassTouched] = useState(false);
  const [userNameTouched,setUserNameTouched] = useState(false);
  const [isUserValid,setIsUserValid] = useState(false);
  const [isPassValid,setPassValid] = useState(false);
  const [isUsernameAvbl,setIsUsernameAvbl] = useState(false);

  // Regex validation for username
  let userRe = /^[a-z0-9._]{3,25}$/;

  // Regex validation for password
  let upperRe = /^(?=.*[A-Z]).*$/ ;
  let lowerRe = /^(?=.*[a-z]).*$/ ;
  let specialCharRe = /^(?=.*[!@#$%^&*()_+={}[\]]).*$/ ;
  let numberRe = /^(?=.*[0-9]).*$/ ;

  async function register(e){
    e.preventDefault();
    setUserNameTouched(true);
    setPassTouched(true);
    if(isPassValid && userName.length>=3){
      let response = fetch('http://localhost:5000/user/register',{
        method:'Post',
        body:JSON.stringify({userName,password}),
        headers:{'Content-type':'application/json'}
      })

      response.then(res =>
        res.json()).then(data => {
            if(data.statusCode==201){
              toast.success("User created successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
              });
            }
            navigate('/login');
        })
    }
  }

  useEffect(() => {
    (password.length>=8 && password.length<=16) ? setLength(true):setLength(false);
    upperRe.test(password) ? setUpper(true):setUpper(false);
    lowerRe.test(password) ? setLower(true):setLower(false);
    numberRe.test(password) ? setNumber(true):setNumber(false);
    specialCharRe.test(password) ? setSpecialChar(true):setSpecialChar(false);
    ((password.length>=8 && password.length<=16) && upperRe.test(password) && lowerRe.test(password) && specialCharRe.test(password) && numberRe.test(password)) ? setPassValid(true):setPassValid(false);
    console.log(password);
  }, [password]);

  useEffect(() => {
    userRe.test(userName) ? setIsUserValid(true):setIsUserValid(false);
    if(isUserValid){
      let response = fetch('http://localhost:5000/user/check-user-avbl',{
        method:'Post',
        body:JSON.stringify({userName}),
        headers:{'Content-type':'application/json'}
      })
      response.then(res =>
        res.json()).then(data => {
            (data.is_username_avbl) ? setIsUsernameAvbl(true) : setIsUsernameAvbl(false);
        }
      )}
  }, [userName]);

  function validatePassword(e){
    if(!passTouched) setPassTouched(true);
    setPassword(e.target.value);
  }

  function validateUserName(e){
    if(!userNameTouched) setUserNameTouched(true);
    setUserName(e.target.value);
  }
  
  return (
    <div className='w-full flex justify-center items-center'>
        <form 
            className='md:w-[40%] sm:w-[60%] w-[80%] flex flex-col gap-5'
            onSubmit={register}>
              
            <div>
              <input
                className='w-full py-3.5 px-5 rounded-md bg-[#2929293c] outline-2 outline-[#FF69B4] placeholder:text-black text-black'
                placeholder='Username'
                type="text"
                value={userName}
                onChange={validateUserName} />

                {
                  userNameTouched && userName === '' &&
                  (
                      <p className='text-red-400'>Username is required.</p>
                  )
                }
                {
                  userName !== '' && !isUserValid &&
                  (
                      <p className='text-red-400'>Username must be atleast 3 to 25 character and only contains letters, number and .,_ only.</p>
                  )
                }
                {
                  isUserValid && !isUsernameAvbl &&
                  (
                      <p className='text-red-400'>Username is not avaliable.</p>
                  )
                }
            </div>

            {/* ------------------------ Password -------------------------- */}
            <div>
                <div className='relative flex items-center'>
                    <input
                      className='w-full py-3.5 px-5 rounded-md bg-[#2929293c] outline-2 outline-[#FF69B4] placeholder:text-black text-black'
                      placeholder='Password'
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={validatePassword}/>
                      
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
                {
                  passTouched && password == '' &&
                  (
                    <div>
                        <p className='text-red-400'>Password is required.</p>
                    </div>
                  )
                }
                {
                  !isPassValid && password != '' &&
                  (
                    <div>
                        <p className={length?'text-green-400':'text-red-400'}>Password should be 8-16 character long.</p>
                        <p className={upper?'text-green-400':'text-red-400'}>Password should contains at least 1 uppercase letter.</p>
                        <p className={lower?'text-green-400':'text-red-400'}>Password should contains at least 1 lowercase letter.</p>
                        <p className={number?'text-green-400':'text-red-400'}>Password should contains at least 1 number.</p>
                        <p className={specialChar?'text-green-400':'text-red-400'}>Password should contains at least 1 spacial character.</p>
                    </div>
                  )
                }
            </div>

            <input
              className='w-full py-3.5 px-5 rounded-md bg-[#FF69B4] text-white cursor-pointer'
              type="submit"
              value="Registration"
              />

        </form>
    </div>
  )
}

export default Register;
