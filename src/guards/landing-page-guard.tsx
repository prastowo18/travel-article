import React, { type FC } from 'react';

interface LandingPageGuardProps {
  children: React.ReactNode;
}
const LandingPageGuard: FC<LandingPageGuardProps> = ({ children }) => {
  return <>{children}</>;
};

export default LandingPageGuard;
