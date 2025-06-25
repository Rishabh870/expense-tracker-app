export const BASE_URL: string = 'http://10.0.2.2:8000';
// export const BASE_URL: string = 'http://172.23.48.1:8000';

import axios from 'axios';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  storeTokens,
} from './tokenManager';

axios.defaults.withCredentials = true;

export const PUBLIC_REQUEST = axios.create({
  baseURL: BASE_URL,
});

export const PRIVATE_REQUEST = axios.create({
  baseURL: BASE_URL,
});

PRIVATE_REQUEST.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

PRIVATE_REQUEST.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(PRIVATE_REQUEST(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;
      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error('Missing refresh token');

        const res = await PUBLIC_REQUEST.post('/auth/refresh-token', {
          refresh_token: refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        const newRefreshToken = res.data.refreshToken;

        await storeTokens(newAccessToken, newRefreshToken);
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return PRIVATE_REQUEST(originalRequest);
      } catch (error) {
        processQueue(error, null);
        await clearTokens();
        // Optionally call logout()
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
