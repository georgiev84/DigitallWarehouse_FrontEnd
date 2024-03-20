import React, { useState } from 'react'
import Layout from '../layouts/Layout'
import videoBg from '../assets/video.mp4';
import './Login.css'

type Props = {}

function Login({ }: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        // Implement login logic here
        console.log('Username:', username);
        console.log('Password:', password);
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
                                <label htmlFor="username">Username:</label>
                                <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                            </div>
                            <div className='loginField'>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                            </div>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login