export const BASE_URL: string = 'http://172.21.176.1:8000';

import axios from 'axios';

axios.defaults.withCredentials = true;

export const PUBLIC_REQUEST = axios.create({
  baseURL: BASE_URL,
});

export const PRIVATE_REQUEST = axios.create({
  baseURL: BASE_URL,
});
