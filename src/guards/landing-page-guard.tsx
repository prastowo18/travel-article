import React, { useEffect, type FC } from 'react';

import { Loading } from '@/components/loading';

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
    return <Loading />;
  }
  return <>{children}</>;
};

export default LandingPageGuard;
