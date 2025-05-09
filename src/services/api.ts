import { request } from './utils';

import type { LoginUser, RegisterUser } from '@/type';

// AUTH
export const loginUserService = (data: LoginUser) =>
  request({
    url: '/api/auth/local',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

export const registerUserService = (data: RegisterUser) =>
  request({
    url: '/api/auth/local/register',
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
