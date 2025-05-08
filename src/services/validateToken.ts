import { request } from './utils';

export const validateToken = async (): Promise<boolean> => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

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
      return true;
    }

    return false; // misalnya data: { id, email, ... }
  } catch {
    return false;
  }
};
