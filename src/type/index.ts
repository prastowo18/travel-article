import type { ComponentType, ReactNode } from 'react';

interface GuardProps {
  children: ReactNode;
}

export interface IRoute {
  path: string;
  element: ComponentType;
  guard?: ComponentType<GuardProps>;
  layout?: ComponentType<GuardProps>;
}

export interface LoginUser {
  identifier: string;
  password: string;
}

export interface RegisterUser {
  email: string;
  username: string;
  password: string;
}
