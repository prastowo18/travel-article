import { request } from './utils';

export interface LoginUser {
  identifier: string;
  password: string;
}
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
