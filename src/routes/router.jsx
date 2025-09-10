import React, { Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from './RootLayout';
import RequireAuth from './RequireAuth';
import RouteErrorBoundary from './RouteErrorBoundary';
import { loginLoader } from './loginLoader.js';
import HomePage from '../pages/HomePage.jsx';
import Loading from '../components/Loading/Loading.jsx';

const LoginPage = React.lazy(() => import('../pages/LoginPage.jsx'));
const SignupPage = React.lazy(() => import('../pages/SignupPage.jsx'));
const DashboardPage = React.lazy(() => import('../pages/DashboardPage.jsx'));
const NotFound = React.lazy(() => import('../pages/NotFound.jsx'));
const AuthLayout = React.lazy(() => import('../pages/AuthLayout.jsx'));

// Temp
const CompProfile1 = React.lazy(
    () => import('../features/CompProfile/Form1/CompProfile1.jsx')
);
const CompProfile2 = React.lazy(
    () => import('../features/CompProfile/Form2/CompProfile2.jsx')
);

const withSuspense = (element) => (
    <Suspense fallback={<Loading />}>{element}</Suspense>
);

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <RootLayout />,
            errorElement: withSuspense(<RouteErrorBoundary />),
            children: [
                {
                    index: true,
                    element: <HomePage />,
                },
                {
                    element: withSuspense(<AuthLayout />),
                    loader: loginLoader,
                    children: [
                        {
                            path: 'login',
                            element: withSuspense(<LoginPage />),
                        },
                        {
                            path: 'signup',
                            element: withSuspense(<SignupPage />),
                        },
                    ],
                },
                {
                    element: <RequireAuth />,
                    children: [
                        {
                            index: true,
                            element: withSuspense(<DashboardPage />),
                        },
                        {
                            path: 'dashboard',
                            element: withSuspense(<DashboardPage />),
                        },
                    ],
                },

                // Temp
                { path: 'profile1', element: withSuspense(<CompProfile1 />) },
                { path: 'profile2', element: withSuspense(<CompProfile2 />) },

                { path: '*', element: withSuspense(<NotFound />) },
            ],
        },
    ],
    {
        future: {
            v7_startTransition: true,
            v7_partialHydration: true,
            v7_fetcherPersist: true,
        },
    }
);
