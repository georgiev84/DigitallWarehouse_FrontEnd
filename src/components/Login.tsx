import React, { useContext, useState } from 'react'
import Layout from '../layouts/Layout'
import videoBg from '../assets/video.mp4';
import './Login.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import NavigationContext from '../context/NavigationContext';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import LoginGoogle from './LoginGoogle';
import axiosUtils from '../interceptors/axiosUtils';

type Props = {}

function Login({ }: Props) {
    const { setLoggedUser, setIsLoggedIn, setUserRole } = useContext(NavigationContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);
    const [isValid, setIsValid] = useState(true);
    const url = '/api/Authentication/login';

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axiosUtils.post(url, { email, password });
            console.log("Response:", response.data.statusCode);

            if (response.data.statusCode === 500 && response.status === 200) {
                setIsValid(false)
            } 
            else if (response.status === 200) {
                console.log(response)

                localStorage.setItem('accessToken', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken)

                const decodedJwt = parseJwt(response.data.token);
                console.log(decodedJwt)
                localStorage.setItem('expireAccessToken', decodedJwt.exp.toString())

                setLoggedUser(decodedJwt.email)
                setIsLoggedIn(true)
                setUserRole(decodedJwt.Role)
                setNavigate(true);
            } else {
                console.error("Error Response:", response.status, response.statusText);
            }

        } catch (error) {
            console.error("Network Error:", error);
        }
    }

    if (navigate) {
        return <Navigate to='/products' />
    }

    const parseJwt = (token: string) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
            return null;
        }
    };

    return (
        <Layout>
            <div className="main">
                <div className="overlay"></div>
                <video src={videoBg} autoPlay loop muted />
                <div className="about">
                    <p>Login</p>
                    <form className='loginForm' onSubmit={handleLogin}>
                        <div className='logininput'>
                            <div className='loginField'>
                                <label htmlFor="email">Email:</label>
                                <input type="text" id="email" value={email} onChange={handleUsernameChange} />
                            </div>
                            <div className='loginField'>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                            </div>
                        </div>
                        {
                           !isValid && <div className='errorMessage'>Wrong email or password!</div>
                        }
                        <button type="submit">Login</button>
                    </form>
                    <LoginGoogle />
                </div>
            </div>
        </Layout>
    )
}

export default Login