import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Image from '../assets/logo.png';
import Settingspng from '../assets/setting-2.png'
import logoutpng from '../assets/logout.png'
import category from '../assets/category.png'
import { useState } from 'react';

// css styles
import './styles/Sidebar.css'; 

const Sidebar = ({navigate, handleLogout}) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    // Function to close sidebar 
    const closeSidebar = () => {
      setIsSidebarOpen(false);
    };
  return (
    <>
  
        <span className="hamburger-menu" onClick={toggleSidebar}>☰</span>
      
    <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className='logo-container'>
        <div className="logo">
          <img src={Image} alt="" />
        </div>
        <h2>Internship Manager</h2>

      </div>
      <nav className='nav-links'>
        <ul>
          <li>
            <Link to='/dashboard' className={location.pathname === '/dashboard' || location.pathname === '/' ? 'active' : ''}  onClick={closeSidebar}>
              <img src={category} alt="" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to='/settings' className={location.pathname === '/settings' ? 'active' : ''} onClick={closeSidebar}>
              <img src={Settingspng} alt="" />
              Settings
            </Link>
          </li>
          <li>
              <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); closeSidebar(); }} className={location.pathname === '/logout' ? 'active' : ''}>
                <img src={logoutpng} alt="" />
                Logout
              </a>
            </li>
        </ul>
      </nav>
    </aside>
    {isSidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}

    </>
  );
};

export default Sidebar;