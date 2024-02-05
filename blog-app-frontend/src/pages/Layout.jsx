import React from 'react';
import Header from '../components/header/header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import './pages.css';

const Layout = () => {
  return (
    <div className='w-full container'>
        <Header/>
		    <Outlet/>
        <div className='w-full absolute bottom-0'>
          <Footer/>
        </div>
    </div>
  )
}

export default Layout
