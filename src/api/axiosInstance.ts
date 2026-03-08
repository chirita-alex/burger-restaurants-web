import axios from 'axios';

import { BASE_URL } from './constants';
import type { ApiError } from './types';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message ?? 'Something went wrong',
      status: error.response?.status ?? 500,
      code: error.response?.data?.code,
    };
    return Promise.reject(apiError);
  }
);

export default axiosInstance;