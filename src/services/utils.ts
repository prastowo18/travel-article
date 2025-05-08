/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';
import qs from 'qs';

export const BASE_URL = 'https://extra-brooke-yeremiadio-46b2183e.koyeb.app';
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

type RequestOptions = AxiosRequestConfig;

export const request = async (options: RequestOptions) => {
  const contentType =
    options.headers?.['Content-Type'] ||
    axiosInstance.defaults.headers['Content-Type'];

  if (
    contentType === 'application/x-www-form-urlencoded' &&
    options.data &&
    typeof options.data === 'object'
  ) {
    options.data = qs.stringify(options.data);
  }

  try {
    const response: AxiosResponse = await axiosInstance(options);
    return response?.data?.data ?? response.data;
  } catch (error) {
    let message = 'Unknown error';

    if (axios.isAxiosError(error)) {
      message =
        (error.response?.data as any)?.error?.message ||
        (error.response?.data as any)?.message ||
        error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    // Buat error baru dengan message yang bersih
    throw new Error(message);
  }
};
