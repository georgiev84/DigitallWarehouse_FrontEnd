import React, { useContext, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import NavigationContext from '../context/NavigationContext'
import './Header.css';

type Props = {}

function Header({ }: Props) {

    return (
        <>
            <div className='navigation'>
                <h1>Digitall Warehouse</h1>
                <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>Home</NavLink>
                <NavLink to="/products" className={({ isActive }) => isActive ? "link active" : "link"}>Products</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "link active" : "link"}>About</NavLink>
                <NavLink to="/login" className={({ isActive }) => isActive ? "link active login" : "link login"}>Login</NavLink>
            </div>
        </>
    )
}

export default Header