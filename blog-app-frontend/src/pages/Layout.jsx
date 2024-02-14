import React from 'react';
import Header from '../components/header/header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/footer/Footer';
import './pages.css';

const Layout = () => {
  return (
    <div className='w-full flex flex-col justify-between min-h-screen h-full'>
        <div className='w-full sticky top-0 z-10'>
          <Header/>
        </div>

        <div className='w-full grow py-8 flex justify-center items-center'>
          <Outlet/>
        </div>

        <div className='w-full'>
          <Footer/>
        </div>
    </div>
  )
}

export default Layout
