import React, { useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import NavigationContext from '../context/NavigationContext'
import './Header.css';
import logout from '../services/Logout';

type Props = {}

function Header({ }: Props) {
    const { isLoggedIn, loggedUser, setLoggedUser, setIsLoggedIn } = useContext(NavigationContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        const accessToken = localStorage.getItem('accessToken') || '';
        const refreshToken = localStorage.getItem('refreshToken') || '';

        logout(accessToken, refreshToken)
            .then(() => {
                setLoggedUser('');
                setIsLoggedIn(false);
                navigate('/login');
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    };

    return (
        <>
            <div className='navigation'>
                <h1>Digitall Warehouse</h1>
                <NavLink to="/" className={({ isActive }) => isActive ? "link active" : "link"}>Home</NavLink>
                <NavLink to="/products" className={({ isActive }) => isActive ? "link active" : "link"}>Products</NavLink>
                <NavLink to="/about" className={({ isActive }) => isActive ? "link active" : "link"}>About</NavLink>
                {
                    isLoggedIn === false ?
                        <div className='logoutSection'>
                            <NavLink to="/login" className={({ isActive }) => isActive ? "link active login" : "link login"}>Login</NavLink>
                            <div className="currentUser">You are not logged in</div>
                        </div>
                        :
                        <div className='logoutSection'>
                            <div className="logout" onClick={handleLogout}>Logout</div>
                            <div className="currentUser">You are logged as {loggedUser}</div>
                        </div>
                }
            </div>

        </>
    )
}

export default Header