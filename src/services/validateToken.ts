import { request } from './utils';

interface ResponseType {
  is_authenticated: boolean;
  id: string;
  email: string;
  username: string;
}
export const validateToken = async (): Promise<ResponseType> => {
  const token = localStorage.getItem('authToken');
  if (!token)
    return {
      is_authenticated: false,
      email: '',
      username: '',
      id: '',
    };

  try {
    const data = await request({
      url: '/api/users/me',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Pastikan response valid
    if (data && data.id && data.email) {
      return {
        is_authenticated: true,
        email: data.email,
        username: data.username,
        id: data.id,
      };
    }

    return {
      is_authenticated: false,
      email: '',
      username: '',
      id: '',
    }; // misalnya data: { id, email, ... }
  } catch {
    return {
      is_authenticated: false,
      email: '',
      username: '',
      id: '',
    };
  }
};
