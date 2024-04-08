import axios from 'axios';
import logout from '../services/Logout';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});
const refreshUrl = `/api/Authentication/refresh`;
instance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const expireAccessToken = localStorage.getItem('expireAccessToken')

    if (accessToken && expireAccessToken !== null && !isExpired(parseInt(expireAccessToken, 10))) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (refreshToken) {
        // Send refresh token and expired token to refresh endpoint to get new access token
        const body = {
            token: accessToken,
            refreshToken: refreshToken,
        };

        return axios.post(refreshUrl, body).then(response => {
            if (response.status === 200) {
                localStorage.setItem('accessToken', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);

                const decodedJwt = parseJwt(response.data.token);

                localStorage.setItem('expireAccessToken', decodedJwt.exp.toString())
                config.headers.Authorization = `Bearer ${response.data.token}`;
            }
            return config;
        });
    }

    return config;
}, error => {
    return Promise.reject(error);
});

const parseJwt = (token: string) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

function isExpired(expirationTime: number): boolean {
    const currentTimeSeconds = Math.floor(Date.now() / 1000);
    return expirationTime <= currentTimeSeconds;
}

export default instance;