import React from 'react';
import logo from './images/Nec-logo-2.png';
import './Header.css'
// import SignUp from './SignUp.jsx';

import { Link } from 'react-router-dom';

function Header() {

  return (

    <div className="home">

      <div className="logo">
        <img src={logo} alt="Company logo" className='nec-logo'/>
      </div>

      <div className="supervisors">
        <a href='#'><p className='supervisor-title'>Sites</p></a>
        <Link to='/SignUp'><p className='supervisor-title'>Sign Up</p></Link>
        
        <Link to='/Login'><p className='supervisor-title'>Login</p></Link>
      </div>
  

    </div>
  );
  
}

export default Header;