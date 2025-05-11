import React from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  Articles,
  Dashboard,
  DashboardArticles,
  DashboardCategories,
  DashboardComments,
  DetailArticle,
  LandingPage,
  Login,
  Register,
} from '@/features';

import DashboardLayout from '@/layouts/dashboard-layout';
import LandingPageLayout from '@/layouts/landing-page-layout';

import AuthGuard from '@/guards/auth-guard';
import GuestGuard from '@/guards/guest-guard';
import LandingPageGuard from '@/guards/landing-page-guard';

import type { IRoute } from '@/type';

export const routes: IRoute[] = [
  {
    path: '/',
    element: LandingPage,
    guard: LandingPageGuard,
    layout: LandingPageLayout,
  },
  {
    path: '/articles',
    element: Articles,
    guard: LandingPageGuard,
    layout: LandingPageLayout,
  },
  {
    path: '/articles/:document_id',
    element: DetailArticle,
    guard: AuthGuard,
    layout: LandingPageLayout,
  },
  {
    path: '/dashboard',
    element: Dashboard,
    guard: AuthGuard,
    layout: DashboardLayout,
  },
  {
    path: '/dashboard/articles',
    element: DashboardArticles,
    guard: AuthGuard,
    layout: DashboardLayout,
  },
  {
    path: '/dashboard/categories',
    element: DashboardCategories,
    guard: AuthGuard,
    layout: DashboardLayout,
  },
  {
    path: '/dashboard/comments',
    element: DashboardComments,
    guard: AuthGuard,
    layout: DashboardLayout,
  },
  {
    path: '/register',
    element: Register,
    guard: GuestGuard,
  },
  {
    path: '/login',
    element: Login,
    guard: GuestGuard,
  },
];

export const renderRoutes = (routes: IRoute[]) => {
  return (
    <Routes>
      {routes?.map((route: IRoute, index: number) => {
        const Component = route.element;
        const Guard = route.guard || React.Fragment;
        const Layout = route.layout || React.Fragment;

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  );
};
