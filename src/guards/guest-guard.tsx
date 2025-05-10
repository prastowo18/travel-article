import { Navigate } from 'react-router-dom';
import React, { type FC, useEffect } from 'react';

import { Loading } from '@/components/loading';

import { useAuthStore } from '@/stores/auth-store';

interface GuestGuardProps {
  children: React.ReactNode;
}
const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated === null) {
      checkAuth();
    }
  }, [isAuthenticated, checkAuth]);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return <>{children}</>;
};

export default GuestGuard;
