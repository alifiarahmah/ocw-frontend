import { TOKEN_ACCESS_KEY, TOKEN_REFRESH_KEY } from '@/constants';
import { UserClaim } from '@/types/token';
import jwt from 'jwt-decode';

export const setToken = (refreshToken: string, accessToken: string) => {
  localStorage.setItem(TOKEN_REFRESH_KEY, refreshToken);
  sessionStorage.setItem(TOKEN_ACCESS_KEY, accessToken);
};

export const unsetToken = () => {
  localStorage.removeItem(TOKEN_REFRESH_KEY);
  sessionStorage.removeItem(TOKEN_ACCESS_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(TOKEN_REFRESH_KEY);
};

export const getAccessToken = () => {
  return sessionStorage.getItem(TOKEN_ACCESS_KEY);
};

export const getUserData = (token: string) => {
  const data = jwt(token);
  return data as UserClaim;
};

export const getAvailableUserData = () => {
  const access = getAccessToken();

  if (access) {
    return getUserData(access);
  }

  const refresh = getRefreshToken();

  if (refresh) {
    return getUserData(refresh);
  }

  return null;
};
