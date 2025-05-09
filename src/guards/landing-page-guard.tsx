import React, { useEffect, type FC } from 'react';

import { useAuthStore } from '@/stores/auth-store';

interface LandingPageGuardProps {
  children: React.ReactNode;
}
const LandingPageGuard: FC<LandingPageGuardProps> = ({ children }) => {
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
  return <>{children}</>;
};

export default LandingPageGuard;
