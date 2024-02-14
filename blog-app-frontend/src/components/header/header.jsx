import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from 'react';
import { userContext } from "../../userContext";

const Header = () => {
  const {isAuthenticated,setIsAuthenticated} = useContext(userContext);
  useEffect(() => {
    const checkLoggedInStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if(loggedIn) setIsAuthenticated(true);
      console.log(isAuthenticated);
    };

    checkLoggedInStatus(); // Initial check
    myFunction()
  }, []); // Empty dependency array ensures useEffect runs only once


  window.onscroll = function() {myFunction()};

  function myFunction() {
    var winScroll = Math.round(document.body.scrollTop || document.documentElement.scrollTop);
    var height = Math.round(document.documentElement.scrollHeight - document.documentElement.clientHeight);
    var scrollIndicator = document.getElementById("myBar");
    if(height!==0)
    {
      var scrolled = Math.round((winScroll / height) * 100);
      scrollIndicator.style.width = scrolled + "%";
    }else{
      scrollIndicator.style.width = 0 + "%";
    }
    scrollIndicator.classList.add('transition-all','delay-75');
  }

  const logout = () => {
    fetch('http://localhost:5000/user/logout', {
      method: 'Get',
      credentials: 'include'
    })
    .then(() => {
      localStorage.clear();
      // setIsLoggedIn(false);
      setIsAuthenticated(false);
    })
    .catch(error => {
      console.error('Logout error:', error);
    });
  };

  // console.log(isAuthenticated);

  return (
    <>
      <div className="w-full bg-gray-100">
        <div className="">
          <div className="flex justify-center items-center">
            <div className='flex justify-between items-center sm:w-[80%] w-[90%] py-4'>
                
                <Link to='/'><h3 className='text-2xl font-bold text-[#FF69B4]'>My Blog</h3></Link>

                <nav>

                  {/* 
                  
                      ------------------- Syntax Active class -------------------
                      className={({isActive})=>(isActive?"active-class":none)}
                  
                  */}
                  {isAuthenticated && (
                    <>
                      <div className='flex items-center gap-3'>
                        <NavLink to="/add-blog" className={({isActive}) => (isActive ? "text-[#FF69B4]" : 'none')}>Add Blog</NavLink>
                        <button onClick={logout}>Logout</button>
                      </div>
                    </>
                  )}

                  { !isAuthenticated && (
                    <>
                      <div className='flex gap-3'>
                          <NavLink to='/login' className={({isActive}) => (isActive ? "text-[#FF69B4]" : 'none')}>Login</NavLink>
                          <NavLink to="/register" className={({isActive}) => (isActive ? "text-[#FF69B4]" : 'none')}>Register</NavLink>
                      </div>
                    </>
                  )}

                </nav>
            </div>
          </div>
          
          <div className="w-full h-2">
              <div id="myBar" className="h-full bg-[#FF69B4]">

              </div>
          </div>
        </div>
      </div>
    </>
  )

}

export default Header;

// export default function Header() {
//     return(
//         <div className="flex justify-center">
//             <div className='flex justify-between sm:w-[80%] w-[90%] py-4'>
                
//                 <h3 className='text-2xl font-bold'>My Blog</h3>

//                 <div className='flex gap-3'>
//                     <Link to='/login'>Login</Link>
//                     <Link to="registration">Register</Link>
//                 </div>
                
//             </div>
//         </div>
//     );
// }