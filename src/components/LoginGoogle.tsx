import React, { useState, useEffect, useContext } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Layout from '../layouts/Layout';
import NavigationContext from '../context/NavigationContext';
import { Navigate } from 'react-router-dom';
import googleLogo from '../assets/google-icon-logo.svg';


type Props = {}

function LoginGoogle({ }: Props) {
    const [user, setUser] = useState<{ access_token?: string; refresh_token?: string }>();
    const { setLoggedUser, setIsLoggedIn, setUserRole } = useContext(NavigationContext);
    const [navigate, setNavigate] = useState(false);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        passTokenToEndpoint(user, res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
    );

    interface UserToken {
        access_token?: string;
    }

    interface UserProfile {
        id: string;
        token?: string;
        email: string;
        verifiedEmail: boolean;
        name: string;
        givenName: string;
        familyName: string;
        picture: string;
        locale: string;
    }

    const passTokenToEndpoint = (user: UserToken, profile: UserProfile) => {
        profile.token = user.access_token;
        if (user) {
            axios.post('https://localhost:7054/api/Authentication/google-authenticate',
                profile
            )
                .then((response) => {
                    if (response.status === 200) {
                        localStorage.setItem('accessToken', response.data.token);
                        setLoggedUser(response.data.email)
                        setIsLoggedIn(true)
                        setUserRole('customer')
                        setNavigate(true);
                    } else {
                        console.error("Error Response:", response.status, response.statusText);
                    }
                })
                .catch((error) => {
                    console.log("error:" + error)
                });
        }
    };

    const logOut = () => {
        googleLogout();
    };

    return (
        <Layout>
            <div>
                <button className="googleButton" onClick={() => login()}>Sign in with Google <img src={googleLogo} /></button>
                {navigate && <Navigate to='/products' />}
            </div>
        </Layout>
    );
}

export default LoginGoogle