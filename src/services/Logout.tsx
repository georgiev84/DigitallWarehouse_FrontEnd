import axios from 'axios';

interface LogoutResponse {
    token: string;
    refreshToken: string;
}

const logout = async (accessToken: string, refreshToken: string): Promise<void> => {
  try {
    const response = await axios.post<LogoutResponse>(`/api/authentication/logout`, {
      token: accessToken,
      refreshToken: refreshToken
    });
  
    localStorage.setItem('accessToken', '');
    localStorage.setItem('refreshToken', '');
    localStorage.setItem('expireAccessToken', '');
    console.log('Logout successful');

  } catch (error) {
      console.error('Logout failed:', error);
  }
};

export default logout;