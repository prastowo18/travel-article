/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import type { RegisterUser } from '@/type';
import { registerUserService } from '@/services/api';

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterUser) => registerUserService(data),

    onSuccess: (data: any) => {
      localStorage.setItem('authToken', data.jwt);
      toast.success('Register successfully!');
      navigate('/');
    },

    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
