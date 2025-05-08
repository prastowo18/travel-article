import { validateToken } from '@/services/validateToken';
import React, { type FC, useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await validateToken();
      setIsAuthenticated(isValid);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center w-full h-screen ">
        Loading
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
};

export default AuthGuard;
