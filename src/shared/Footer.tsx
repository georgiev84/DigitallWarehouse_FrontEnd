import React, { useState } from 'react'
import './Footer.css'
import { FaAngleDown, FaAngleUp, FaFacebook, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

type Props = {}

function Footer({ }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`footer ${expanded ? 'expanded' : ''}`} onClick={toggleExpanded}>
      {expanded ? <FaAngleDown /> : <FaAngleUp />}
      {expanded && (
        <div className="footerItems">
          <div className='footerLinks'>
          Links
            <hr />
            <NavLink to="/" className="footerLink">Home</NavLink>
            <NavLink to="/products" className="footerLink">Products</NavLink>
            <NavLink to="/about" className="footerLink">About</NavLink>
            <NavLink to="/login" className="footerLink">Login</NavLink>
          </div>
          <div >
            Social Media
            <hr />
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className='socialMedia'>
              <FaFacebook />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" >
              <FaTwitter />
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default Footer