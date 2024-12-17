/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { RouteObject } from 'react-router-dom';

const TourLandingPage = React.lazy(() => import('./pages/TourLandingPage'));
const TourDetailPage = React.lazy(() => import('./pages/TourDetail'));
const UserLayout = React.lazy(() => import('@components/layouts/UserLayout'));
const UserReviews = React.lazy(() => import('@pages/UserReviews'));
const UserSettings = React.lazy(() => import('@pages/UserSettings'));
const AuthPage = React.lazy(() => import('@pages/AuthPage'));
const ForgotPasswordPage = React.lazy(() => import('./pages/ForgotPassword'));
const NotFoundPage = React.lazy(() => import('@components/common/Illustrations/404NotFound'));
const NetworkErrorPage = React.lazy(() => import('@components/common/Illustrations/NetworkError'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <UserLayout />,
    children: [
      {
        index: true, // This renders when `/` is visited directly
        element: <TourLandingPage />,
      },
      {
        path: 'tours', // This renders when `/tours` is visited directly
        element: <TourLandingPage />,
      },
      {
        path: 'tours/detail/:id', // Nested route for tour details
        element: <TourDetailPage />,
      },
      {
        path: 'reviews',
        element: <UserReviews />,
      },
      {
        path: 'settings',
        element: <UserSettings />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/network-error',
    element: <NetworkErrorPage />,
  },
  {
    path: '*', // Catch-all for unmatched routes
    element: <NotFoundPage />, // Create a NotFoundPage component for this
  },
];
