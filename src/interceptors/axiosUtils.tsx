import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:7054', // Optional: Set the base URL for all requests
});
const refreshUrl = 'https://localhost:7054/api/Authentication/refresh';
instance.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const expireAccessToken = localStorage.getItem('expireAccessToken')

    if (accessToken && expireAccessToken !== null && !isExpired(parseInt(expireAccessToken, 10))) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    } else if (refreshToken) {
        // Send refresh token and expired token to refresh endpoint to get new access token
        console.log('call refresh api - ' + refreshToken)
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
    // Get the current time in seconds
    const currentTimeSeconds = Math.floor(Date.now() / 1000);

    console.log(expirationTime <= currentTimeSeconds)
    // Compare the expiration time with the current time
    return expirationTime <= currentTimeSeconds;
}

export default instance;

// import axios from 'axios';

// const instance = axios.create({
//     baseURL: 'https://localhost:7054', // Optional: Set the base URL for all requests
// });

// instance.interceptors.request.use(config => {
//     console.log("axios " + config)

//     config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
//     return config;
// }, error => {
//     return Promise.reject(error);
// });

// export default instance;