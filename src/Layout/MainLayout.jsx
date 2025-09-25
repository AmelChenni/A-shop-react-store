import React  from 'react'
import Navbar from './../Components/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from './../Components/Footer/Footer';
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop';


export default function MainLayout() {




  return (
    <div>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </div>
  )
}
