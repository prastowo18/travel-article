/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import type { LoginUser } from '@/type';
import { loginUserService } from '@/services/api';
import { useAuthStore } from '@/stores/auth-store';

export const useLogin = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginUser) => loginUserService(data),

    onSuccess: (data: any) => {
      localStorage.setItem('authToken', data.jwt);
      toast.success('Login successfully!');

      checkAuth();

      navigate('/');
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
