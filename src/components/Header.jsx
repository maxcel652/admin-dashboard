import React from 'react'
import './styles/Header.css'
// import Image from '../assets/Ellipse 1.png'

const Header = ({adminProfile}) => {

    console.log('Header received adminProfile:', adminProfile); 

  return (
    
   <header>
    <h1>Welcome to dashboard</h1>
    <div className='user-info'>
        <div className="avatar">
            {adminProfile.image?(
                <img src={adminProfile.image} alt={adminProfile.name} />
            ) : (
                <span>{adminProfile.name.charAt(0)}{adminProfile.name.split(' ')[1]?.charAt(0) || ''}</span>
            )}
        </div>
        <div>
            <span>{adminProfile.name}</span>
            <div className='role'>{adminProfile.role}</div>
        </div>
    </div>
   </header>
  )
}

export default Header