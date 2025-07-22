import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


// importing components
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InternDetails from './components/InternDetails'
import Settings from './components/Settings';
import Login from './components/Login';

import Image from '../src/assets/logo.png'


const mockInterns = [];


const getInitialInterns = () => {
  const storedInterns = localStorage.getItem('internsData');
  try{
    return storedInterns ? JSON.parse(storedInterns):mockInterns;
  } catch (e){
    console.error("Error parsing interns data from localStorage:", e);

    return mockInterns
  }
}

const getInitialAdminProfile = () => {
  const storedProfile = localStorage.getItem('adminProfileData');
  try {
    return storedProfile ? JSON.parse(storedProfile) : {
      name: 'Lawson Mario',
      role: 'Admin',
      avatarUrl: Image 
    };
  } catch (e) {
    console.error("Error parsing admin profile data from localStorage:", e);
    return {
      name: 'Lawson Mario',
      role: 'Admin',
      avatarUrl: Image
    };
  }
};


function AppContent() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const [interns, setInterns] = useState(getInitialInterns);

  const [adminProfile, setAdminProfile] = useState(getInitialAdminProfile);

  // useeffect to save intern's data
  useEffect(() => {
    localStorage.setItem('internsData', JSON.stringify(interns));
    console.log('Interns data saved to localStorage:', interns); // For debugging
  }, [interns])


 // useEffect to save admin profile data to local storage whenever 'adminProfile' state changes
  useEffect(() => {
    localStorage.setItem('adminProfileData', JSON.stringify(adminProfile));
    console.log('Admin profile data saved to localStorage:', adminProfile); // For debugging
  }, [adminProfile]);

    // Handle logout logic
    const handleLogout = () => {
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn'); // Remove login status from storage
      navigate('/login'); // Redirect to login page
    };

      // Effect to redirect to login if not logged in and trying to access protected routes
  useEffect(() => {
    const protectedPaths = ['/', '/dashboard', '/interns', '/settings']; // Define protected paths
    if (!isLoggedIn && protectedPaths.some(path => location.pathname.startsWith(path))) {
      navigate('/login');
      
    }
  }, [isLoggedIn, navigate, location.pathname]);
  return (
    <>
      {isLoggedIn ?(
      < >
        <Sidebar navigate={navigate} handleLogout={handleLogout}/>
        <div className='content-area'>
          <Header adminProfile={adminProfile}/>
          <main className='main-content-card'>
            <Routes>
              <Route path='/' element={<Dashboard interns={interns} setInterns={setInterns}/>}/>
              <Route path='/dashboard' element={<Dashboard interns={interns} setInterns={setInterns}/>}/>
              <Route path='/interns/:id' element={<InternDetails interns={interns}/>}/>
              <Route path='/settings' element={<Settings adminProfile={adminProfile} setAdminProfile={setAdminProfile}/>}/>
              <Route path='*' element={<div>Page not found</div>}/>
            </Routes>
          </main>
        </div>
      </>
      ) :(
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      
      )}
    </>
  );
}

function App(){
  return(
    <Router>
      <AppContent/>
    </Router>
  )
}


export default App;