import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/auth-store';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated === null) {
      checkAuth();
    }
  }, [isAuthenticated, checkAuth]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthGuard;
