/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUserService } from './api';

export const handleLogin = async () => {
  try {
    const data = await loginUserService({
      identifier: 'prtest@gmail.com',
      password: 'prpasswordtest',
    });

    const token = data?.jwt;
    if (token) {
      localStorage.setItem('authToken', token);
      console.log('Logged in successfully!');
      window.location.href = '/dashboard';
    } else {
      console.log('Login failed: Token not found');
    }
  } catch (err: any) {
    console.log(err.message); // error sudah dijamin bertipe Error
  }
};
